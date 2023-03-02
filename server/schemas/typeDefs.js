// import gql
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

    type User {
        _id: ID!
        firstName: String!
        email: String!
        totalMatches: Int!
        reviews: [Review]!
    }

    type Review {
        _id: ID!
        reviewText: String!
        firstName: String!
        created_at: String!
    }

    input ReviewInput {
        reviewText: String!
        firstName: String!
    }

    type Match {
        _id: ID!
        email: String!
        firstName: String!
    }

    input MatchInput {
        email: String!
        firstName: String!
    }
    
    type Auth {
        token: ID!
        user: User!
    }
  
    type Query {
        me: User
        getUserById(userId: ID!): User
        getReviewsByUserId(userId: ID!): [Review]!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(email: String!, password: String!, firstName: String!): Auth
        addReview(userId: ID!, reviewData: ReviewInput!): Review!
        addMatch(userId: ID!, matchData: MatchInput!): Match!
    }
`;

// export module
module.exports = typeDefs;