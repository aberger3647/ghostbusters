import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_ME } from '../queries';

import MatchCard from '../components/MatchCard';

const Matches = () => {
    // const { data, loading, error } = useQuery(GET_ME);

    // const matches = data.me.matches;

    return (
        <div>
        <h1>My Matches</h1>
        <div className="matches">
            {/* {matches.map((user) => (
            <MatchCard key={user._id} user={user} />
            ))} */}
        </div>
        </div>
    );
};

export default Matches;
