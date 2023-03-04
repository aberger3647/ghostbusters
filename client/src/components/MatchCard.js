import React from 'react';

// pull user data and put on matchcard (match page maps through matches array to populate match cards)
const MatchCard = ({ user }) => {
    return (
        <div>
            <h1>{user.firstName}</h1>
            <img src={user.image} alt={user.fullName} />
        </div>
    );
};
  
export default MatchCard;