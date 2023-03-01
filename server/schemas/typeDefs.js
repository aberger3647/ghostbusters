// import gql
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

    type User {
        _id: ID!
        fullName: String!
        email: String!
        totalMatches: Int!
        reviews: [Review]!
    }

    type Review {
        _id: ID!
        reviewText: String!
        username: String!
        created_at: String!
    }

    input ReviewInput {
        reviewText: String!
        username: String!
    }

    type Match {
        _id: ID!
        email: String!
        fullName: String!
    }

    input MatchInput {
        email: String!
        fullName: String!
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
        addUser(email: String!, password: String!, fullName: String!): Auth
        addReview(userId: ID!, reviewData: ReviewInput!): Review!
        addMatch(userId: ID!, matchData: MatchInput!): Match!
    }
`;

// export module
module.exports = typeDefs;