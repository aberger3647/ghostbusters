import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

import MatchCard from '../components/MatchCard';
import Header from '../components/Header'
const Matches = () => {

    const { loading, data } = useQuery(GET_ME);
    const me = data?.me || {};
    const matches = me.matches

    return (
        <div className='contentContainer'>
            <Header title="my matches" />
            <div className="matches">
                {matches ? (
                    matches.map((match) => (<MatchCard key={match._id} user={match._id} />))
                ) : (
                    <h4>No Matches Yet!</h4>
                )}

            </div>
        </div>
    );
};

export default Matches;