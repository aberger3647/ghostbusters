import React, { useState } from 'react';
import profilePhoto from '../assets/profile-icon.svg'

// pull user data and put on matchcard (match page maps through matches array to populate match cards)
const MatchCard = ({ user }) => {

    const [name, setName] = useState('Jessica')

    return (
        <div className='matchCard'>
            <a href="">
            <h3>{name}</h3>
            <img src={profilePhoto} alt="match pic" />
            </a>
            <hr/>
        </div>
    );
};

export default MatchCard;