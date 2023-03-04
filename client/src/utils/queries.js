import { gql } from '@apollo/client'

export const GET_ME = gql`
    query me {
        me {
            _id
            firstName
            email
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
                age
                gender
                height
                religion
                politics
                smoking
                drinking
            }
        }
    }
`

// needs updated query for matches page to pull data from user's matches
