import React from 'react';
import Info from '../components/Info'
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_PROFILE } from '../utils/queries';

const Profile = () => {

    const handleLogout = () => {
        Auth.logout();
    };
    const { loading, data } = useQuery(GET_ME);
    const profile = data?.me.profile || {};

    if (loading) {
        return <div>Potentially app logo</div>
    }

    return (
        <div>
            <h2>My Profile</h2>

            <p>Image here</p>

            <p>{profile.gender} {profile.age} {profile.height}</p>

            <p>{profile.bio}</p>

            <p>{profile.religion}</p>
            <p>{profile.politics}</p>
            <p>{profile.smoking}</p>
            <p>{profile.drinking}</p>


            <hr></hr>

            <h4>Preferences</h4>

            <p>Age: </p>
            <p>Height:</p>
            <p>Religion</p>
            <p>Politics:</p>

            <p>Smoking</p>
            <p>Drinking</p>

            <button>Edit</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Profile;