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
    // getReviewsByUserId: async (parent, { userId }, context) => {
    //   if (context.user) {
    //     return Review.find({ reviewedUser: userId }).populate('reviewer');
    //   }
    //   throw new AuthenticationError('You must be logged in.');
    // }


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
    // addReview: async (parent, { userId, reviewData }, context) => {
    //   if (!context.user) {
    //     throw new AuthenticationError('You must be logged in.');
    //   }

    //   const { reviewText, username } = reviewData;

    //   const review = await Review.create({
    //     reviewer: context.user._id,
    //     reviewedUser: userId,
    //     reviewText,
    //     username,
    //   });

    //   await User.findByIdAndUpdate(userId, { $push: { reviews: review._id } });

    //   return review;
    // },

    // NOT SURE THIS WORKS
    // addMatch: async (parent, { userId, matchData }, context) => {
    //   if (context.user) {
    //     throw new AuthenticationError('User not found by that Id.');
    //   }

    //   const { email, firstName } = matchData;

    //   const user = await User.findOne({ _id: userId });

    //   if (!user) {
    //     throw new Error('Cannot find user with that Id');
    //   }

    //   const match = await Match.create({ user1: context.user._id, user2: user._id });

    //   await User.findByIdAndUpdate(userId, { $inc: { totalMatches: 1 } });

    //   return match;
    // },
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
