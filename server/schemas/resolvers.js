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
        return User.findOne({ _id: context.user._id }).populate('profile').populate('preference').populate('savedReviews');
      }
      throw new AuthenticationError('You must be logged in.');
    },
    users: async () => {
      return User.find();

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
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { profile: profile._id }
        );
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

    addReview: async (parent, { userId, reviewText }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              reviews: { reviewText, reviewer: context.user.firstName },
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
      console.log(newImage)
      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { image: newImage } },
        { new: true }
      )
    },
    addLike: async (parent, args, context) => {
      // if (!context.user) {
      //   throw new AuthenticationError('You must be logged in.')
      // }
      let match = false;
      console.log(args)
      const likedUser = await User.findOne({ _id: args.userId })
      console.log(likedUser)
      // IF LIKED USER ALREADY HAS YOU LIKED (ITS A MATCH)
      if (likedUser.likes.includes("640196d888622758d0611d07")) {
        console.log('they like you already')

        // UPDATE LIKED USER (REMOVE FROM LIKES)
        await User.findOneAndUpdate(
          { _id: likedUser._id },
          { $pull: { likes: "640196d888622758d0611d07" } },
          { new: true }
        )
        console.log('')

        // UPDATE LIKED USER (ADD TO MATCHES)
        await User.findOneAndUpdate(
          { _id: likedUser._id },
          { $addToSet: { matches: "640196d888622758d0611d07" } },
          { new: true }
        )
        console.log('')

        // UPDATE LOGGED IN USER TO ADD LIKED USER TO MATCHES
        await User.findOneAndUpdate(
          { _id: "640196d888622758d0611d07" },
          { $addtoSet: { matches: args.userId } },
          { new: true }
        )
        console.log('')
        match = true;

      } else {
        // ADD LIKE TO USER'S LIKES
        await User.findOneAndUpdate(
          { _id: "640196d888622758d0611d07" },
          { $addToSet: { likes: args.userId } },
          { new: true }
        )
        console.log('ONLY ADD TO LIKES')
      }

    }
  },
};

module.exports = resolvers;