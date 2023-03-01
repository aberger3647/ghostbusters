const { AuthenticationError } = require('apollo-server-express');
const { User, Review, Match } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('savedReviews');
        }
        throw new AuthenticationError('You must be logged in.');
    },

    users: async (parent, { preferences }, context) => {
        if (context.user) {
            const users = await User.find({ $and: preferences });
            return users;
        }
        throw new AuthenticationError('You must be logged in.');
    },

    matches: async (parent, args, context) => {
        if (context.user) {
            const matches = await Match.find({ $or: [{ user1: context.user._id }, { user2: context.user._id }] }).populate('user1 user2');
            return matches;
        }
        throw new AuthenticationError('You must be logged in.');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('User not found by that email.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password.');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password, preferences }) => {
        const user = await User.create({ username, email, password, preferences });
        const token = signToken(user);
        return { token, user };
    },

    // new review ** use input type for review data
    // not sure how to use reviewer/reviewed
    addReview: async (parent, { reviewedUserId, text }, context) => {
        if (!context.user) {
            throw new AuthenticationError('You must be logged in.');
        }
    
        const review = await Review.create({
            reviewer: context.user._id,
            reviewedUser: reviewedUserId,
            text,
        });
    
        return review;
    },

    // not sure how to match another user to current user
    addMatch: async (parent, { user2Id, preferences }, context) => {
      if (context.user) {
        const user1 = await User.findOne({ _id: context.user._id });
        const user2 = await User.findOne({ _id: user2Id });

        if (!user2) {
          throw new Error('Cannot find user with that Id');
        }

        const match = await Match.create({ user1: user1._id, user2: user2._id });

        return match;
      }
      throw new AuthenticationError('You must be logged in.');
    },

    // removeMatch: async (parent, { matchId }, context) => {
    //   if (context.user) {
    //     const match = await Match.findOne({ _id: matchId });

    //     if (!match) {
    //       throw new Error('Cannot find match with that Id');
    //     }

    //     if (!match.user1.equals(context.user._id) && !match.user2.equals(context.user._id)) {
    //       throw new AuthenticationError('Unable to delete match.');
    //     }

    //     await Match.deleteOne({ _id: matchId });

    //     return 'Match deleted';
    //   }
    //   throw new AuthenticationError('You must be logged in.');
    // },
  },
};

module.exports = resolvers;
