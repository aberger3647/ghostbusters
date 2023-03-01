import React from 'react';

import Auth from '../utils/auth';

const Explore = () => {
    Auth.loggedIn();

    return (
        <>
            <nav>
                <p>My Profile</p>
                <p>Matches</p>
            </nav>

            <div>
            <h1>Name</h1>
            <p>Image</p>
            <p>Gender, Age, Height</p>

            <div>
                <p>❌</p>
            </div>

            <div>
                <p>💕</p>
            </div>
            </div>


        </>
    )
};

export default Explore;