import React, { useState, useEffect } from 'react';
import { Image, Transformation } from "cloudinary-react";
import profilePhoto from '../assets/profile-icon.svg'

const Review = (props) => {

    const [containerDirection, setContainerDirection] = useState({})

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

    return (
        <>
            <div className="reviewContainer" style={containerDirection}>
                {/* <img className="smallPhoto" src={profilePhoto} /> */}
                <Image
                    className="smallPhoto"
                    cloudName={process.env.REACT_APP_CLOUD_NAME}
                    publicId={props.image}
                    alt="Prof pic"
                >
                    <Transformation
                        width="136"
                        height="136"
                        gravity="face"
                        radius="max"
                        crop="fill"
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