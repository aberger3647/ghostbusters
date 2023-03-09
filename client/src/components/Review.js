import React, { useState, useEffect } from 'react';
import { Image, Transformation } from "cloudinary-react";
import profilePhoto from '../assets/profile-icon.svg'
import { GET_ME } from '../utils/queries';
import { useQuery } from "@apollo/client";

const Review = (props) => {

    const [containerDirection, setContainerDirection] = useState({})
    const [imageId, setImageId] = useState("");

    const isEven = (num) => {
        if (num % 2 === 0) {
            return 'even'
        } else {
            return 'odd'
        }
    }

    useEffect(() => {
        if (isEven(props.direction) === 'odd') {
            setContainerDirection(styles.divRight)
        }
    }, [])

    const styles = {
        divRight: {
            flexDirection: "row-reverse",
        },
    }

    const { loading, data } = useQuery(GET_ME);
    const me = data?.me || {};

    useEffect(() => {
        if (me) {
            let newImage = `${me.image}.png`
            setImageId(newImage)
        }
    }, [me])

    return (
        <>
            <div className="reviewContainer" style={containerDirection}>
                {/* <img className="smallPhoto" src={profilePhoto} /> */}
                <Image
                    className="smallPhoto"
                    cloudName={process.env.REACT_APP_CLOUD_NAME}
                    publicId={imageId}
                    alt="Prof pic"
                >
                    <Transformation
                        width="500"
                        height="500"
                        gravity="face"
                        radius="max"
                        crop="fill"
                        border="20px_solid_rgb:6789FF"
                    />
                </Image>
                <div className="reviewText" >
                    <h4>{props.name}</h4>
                    <h5>{props.reviewText}</h5>
                </div>
            </div>
            <hr />
        </>
    )
};

export default Review;