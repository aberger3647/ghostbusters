// import gql
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

    type User {
        _id: ID!
        username: String
        email: String
        reviewCount: Int
        savedBooks: [Book]
    }

    type Review {
        reviewId: String!
        username: [String]
        reviewBody: String
    }

    input reviewInput {
        username: [String]
        reviewBody: String
        reviewId: String
        image: String
        title: String
        link: String
        }

    type Match {

    }

    input matchInput {

    }
    
    type Auth {
        token: ID!
        user: User
    }
  
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        savedReviews(reviewData: reviewInput): User
        savedMatches(matchData: matchInput): User
    }
`;

// export module
module.exports = typeDefs;