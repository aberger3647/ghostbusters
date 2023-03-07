import React, { useState, useEffect } from "react";
import profilePhoto from '../assets/profile-icon.svg';
import { Image, Transformation } from "cloudinary-react";
import { GET_ME } from '../utils/queries';
import { useQuery } from "@apollo/client";


const ProfileCard = (props) => {

    const [imageId, setImageId] = useState("");

    const { loading, data } = useQuery(GET_ME);
    const me = data?.me || {};
    const profile = data?.me.profile || {};

    useEffect(() => {
        if (me) {
            let newImage = `${me.image}.png`
            setImageId(newImage)
        }
    }, [me])

    return (
        <>
            <Image
                className="mediumPhoto topPhoto"
                cloudName={process.env.REACT_APP_CLOUD_NAME}
                publicId={props.image}
                alt="Prof Pic"
            >
                <Transformation
                    width="345"
                    height="345"
                    gravity="face"
                    radius="max"
                    crop="fill"
                />
            </Image>

            <h2 className='exploreName'>{props.name}</h2>
            <div className='exploreStatContainer'>
                <h3 className="exploreStats">{props.gender} </h3>
                <h3 className="exploreStats">{props.age}</h3>
                <h3 className="exploreStats">{props.height}</h3>
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
};

export default ProfileCard; 