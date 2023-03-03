const { AuthenticationError } = require('apollo-server-express');
const { User, Review, Match } = require('../models');
const Profile = require('../models/Profile');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedReviews');
      }
      throw new AuthenticationError('You must be logged in.');
    },
    users: async () => {
      return User.find();

    },
    user: async (parent, { userId }, context) => {
      return User.findOne({ _id: userId });
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

    addReview: async (parent, { userId, reviewText }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              reviews: { reviewText, firstName: context.user.firstName },
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
    }
  },
};

module.exports = resolvers;
