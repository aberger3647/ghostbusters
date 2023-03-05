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

            <h2 className='exploreName'>{props.name}</h2>
            <div className='exploreStatContainer'>
                <h3 className="exploreStats">{props.gender} </h3><h3 className="exploreStats">{props.age}</h3> <h3 className="exploreStats">{props.height}</h3>
            </div>

            <p className="profilebioText">{props.bio}</p>


            <div className="profileDetailsContainer">
                <h4>Reddit Moderator</h4>
                <div className="profileDetails">
                    <h4>{props.religion}</h4>
                    <h4>{props.politics}</h4>
                </div>
                <div className="profileDetails">
                    <h4>{props.smoking}</h4>
                    <h4>{props.drinking}</h4>
                </div>
            </div>
        </>
    )
}

export default ProfileCard; 