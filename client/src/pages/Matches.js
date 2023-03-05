import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_ME } from '../queries';

import MatchCard from '../components/MatchCard';
import Header from '../components/Header'
const Matches = () => {
    // const { data, loading, error } = useQuery(GET_ME);

    // const matches = data.me.matches;

    return (
        <div className='contentContainer'>
            <Header title="my matches" />
        <div className="matches">
            {/* {matches.map((user) => (
            <MatchCard key={user._id} user={user} />
            ))} */}
            <MatchCard />
            <MatchCard />
            <MatchCard />
            <MatchCard />
            <MatchCard />
            <MatchCard />
        </div>
        </div>
    );
};

export default Matches;