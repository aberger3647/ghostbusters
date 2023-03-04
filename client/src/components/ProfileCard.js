import React, { useState } from "react";
import profilePhoto from '../assets/profile-icon.svg'


const ProfileCard = (props) => {

    const [gender, setGender] = useState('M')
    const [age, setAge] = useState('33')
    const [height, setHeight] = useState(`6'`)
    const [name, setName] = useState('Marcus')

    return (
        <>
            <img className='mediumPhoto' src={profilePhoto} alt='Profile Pic' />

            <h2 className='exploreName'>{name}</h2>
            <div className='exploreStatContainer'>
                <h3 className="exploreStats">{gender} </h3><h3 className="exploreStats">{age}</h3> <h3 className="exploreStats">{height}</h3>
            </div>

            {/* <p>{profile.bio}</p> */}
            <p className="profilebioText">I'm not just a regular guy. I love tacos, coffee, beer, traveling and hiking. 6 feet cuz apparently that matters!</p>

            {/* <h4>{profile.religion}</h4>
                <h4>{profile.politics}</h4>
                <h4>{profile.smoking}</h4>
                <h4>{profile.drinking}</h4> */}
            <div className="profileDetailsContainer">
                <h4>Reddit Moderator</h4>
                <div className="profileDetails">
                    <h4>Atheist</h4>
                    <h4>Liberal</h4>
                </div>
                <div className="profileDetails">
                    <h4>Smokes: No</h4>
                    <h4>Drinks: Heavily</h4>
                </div>
            </div>
        </>
    )
}

export default ProfileCard; 