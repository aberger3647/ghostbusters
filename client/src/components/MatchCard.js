import React, { useEffect, useState } from 'react';
import profilePhoto from '../assets/profile-icon.svg'
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_USER } from '../utils/queries'
import { Image, Transformation } from "cloudinary-react";

// pull user data and put on matchcard (match page maps through matches array to populate match cards)
const MatchCard = (props) => {

    const { loading, data } = useQuery(GET_SINGLE_USER, {
        variables: { userId: props.user },
    });

    const user = data?.user || {};

    const [imageId, setImageId] = useState("");

    useEffect(() => {
        if (user.image) {
            let newImage = `${user.image}.png`;
            setImageId(newImage);
        }
    }, [user]);

    return (
        <div className='matchCard'>
            <Link to={`/details/${props.user}`}>
                <h3>{user.firstName}</h3>
                {imageId ? (
                <Image
                className="mediumPhoto topPhoto"
                cloudName={process.env.REACT_APP_CLOUD_NAME}
                publicId={imageId}
                alt="Prof Pic"
            >
                <Transformation
                    width="345"
                    height="345"
                    gravity="face"
                    radius="max"
                    crop="fill"
                    border="10px_solid_rgb:6789FF"
                />
            </Image>
            ) : (
                <img src={profilePhoto} className="mediumPhoto" alt="prof pic" />
            )}
            </Link>
            <hr />
        </div>
    );
};

export default MatchCard;