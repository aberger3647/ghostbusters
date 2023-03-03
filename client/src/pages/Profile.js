import React from 'react';
import Info from '../components/Info'

import useQuery from '@apollo/client';

const Profile = () => {

    // const { loading, data } = useQuery(QUERY_ME);
    const data = "woo"
    const loading = false
    const user = data?.user || {};

    if (!user?.userId) {
        return (
            <h4>
                Sign up or login to view your profile!
            </h4>
        );
    }

    if (loading) {
        return <div>Potentially app logo</div>
    }

    return (
        <div>
            <Info />

            <hr></hr>

            <h4>Preferences</h4>

            <p>Age:</p>
            <p>Height</p>
            <p>Religion</p>
            <p>Politics:</p>

            <p>Smoking</p>
            <p>Drinking</p>

            <button>Edit</button>
            <button>Logout</button>
        </div>
    )
};

export default Profile;