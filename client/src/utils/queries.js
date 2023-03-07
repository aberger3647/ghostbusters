import { gql } from '@apollo/client'

export const GET_ME = gql`
    query me {
        me {
            _id
            firstName
            email
            image
            profile {
                _id
                age
                gender
                height
                religion
                politics
                smoking
                drinking
                bio
            }
            preference {
                _id
                minAge
                maxAge
                gender
                minHeight
                maxHeight
                religion
                politics
                smoking
                drinking
            }
            likes {
                _id
            }
            matches {
                _id
            }
            dislikes {
                _id
            }
        }
    }
`

export const GET_SINGLE_USER = gql`
    query getSingleUser($userId: ID!) {
        user(userId: $userId) {
            _id
            firstName
            email
            image
            profile {
                _id
                age
                gender
                height
                religion
                politics
                smoking
                drinking
                bio
            }
            reviews {
                _id
                reviewText
                reviewer
                image
            }
        }
    }
`

export const GET_IMAGE = gql`
    query getImage {
        me {
            image
        }
    }
`

export const GET_USER = gql`
    query getUsers {
        users {
            _id
            firstName
            email
            image
            profile {
                _id
                age
                gender
                height
            }
        }
    }
`

// needs updated query for matches page to pull data from user's matches
