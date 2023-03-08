const { AuthenticationError } = require('apollo-server-express');
const { User, Review, Match } = require('../models');
const Preference = require('../models/Preference');
const Profile = require('../models/Profile');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    getImage: async (parent, args, context) => {
      if (context.user) {
        return User.findOne(
          { _id: context.user._id },
          { image }
        )
      }
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('profile').populate('preference').populate('reviews').populate('likes').populate('matches').populate('dislikes');
      }
      throw new AuthenticationError('You must be logged in.');
    },
    users: async () => {
      return User.find().populate('profile');

    },
    user: async (parent, { userId }, context) => {
      return User.findOne({ _id: userId }).populate('profile');
    },
  },

  Mutation: {

    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new AuthenticationError('User not found by that email.');
      }
      const correctPw = await user.isCorrectPassword(args.password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addProfile: async (parent, args, context) => {
      if (context.user) {
        const profile = await Profile.create(args.profile);
        console.debug('created profile', profile);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { profile: profile._id }
        );
        return profile;
      } else {
        throw new AuthenticationError('You must be logged in.');
      }
    },

    editProfile: async (parent, args, context) => {
      if (context.user) {
        console.debug('updating profile with', args);
        const profile = await Profile.findByIdAndUpdate(args.profile._id, args.profile, {new: true});
        console.debug('updated profile', profile);
        return profile;
      } else {
        throw new AuthenticationError('You must be logged in.');
      }
    },

    addPreference: async (parent, args, context) => {
      if (context.user) {
        const preference = await Preference.create(args.preference);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { preference: preference._id }
        );
        return preference;
      } else {
        throw new AuthenticationError('You must be logged in.');
      }
    },

    editPreference: async(parent, args, context) => {
      if (context.user) {
        console.debug('updating preferences with', args);
        const preference = await Profile.findByIdAndUpdate(args.preference._id, args.preference, {new: true});
        console.debug('updated preferences', preference);
        return preference;
      } else {
        throw new AuthenticationError('You must be logged in.');
      }
    },

    addReview: async (parent, { userId, reviewText }, context) => {
      if (context.user) {

        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              reviews: { reviewText, reviewer: context.user.firstName, image: context.user.image },
            },
          },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You must be logged in.');
    },

    uploadImage: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in.');
      }
      const newImage = args.image

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { image: newImage } },
        { new: true }
      )
    },
    addLike: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in.')
      }
      let match = false;
      const likedUser = await User.findOne({ _id: args.userId }).populate('likes').populate('matches');
      const me = await User.findOne({ _id: context.user._id }).populate('likes').populate('matches');

      // IF LIKED USER ALREADY HAS YOU LIKED (ITS A MATCH)
      if (likedUser.likes.includes(context.user._id)) {


        // UPDATE LIKED USER (REMOVE FROM LIKES)
        await User.findOneAndUpdate(
          { _id: likedUser._id },
          { $pull: { likes: context.user._id } },
          { new: true }
        )


        // UPDATE LIKED USER (ADD TO MATCHES)
        await User.findOneAndUpdate(
          { _id: likedUser._id },
          { $addToSet: { matches: context.user._id } },
          { new: true }
        )


        // UPDATE LOGGED IN USER TO ADD LIKED USER TO MATCHES
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { matches: args.userId } },
          { new: true }
        )



        match = true;

        return { match, me, likedUser }

        // IF THEY DON'T LIKE YOU YET
      } else {
        // ADD LIKE TO USER'S LIKES
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { likes: args.userId } },
          { new: true }
        )
        return { match }
      }

    },

    addDislike: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in.')
      }
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { dislikes: args.userId } },
        { new: true }
      )
    }
  },
};

module.exports = resolvers;