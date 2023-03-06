import React, { useState, useEffect } from 'react';
import profilePhoto from '../assets/profile-icon.svg'

const Review = (props) => {

    const [containerDirection, setContainerDirection] = useState({})

    useEffect(() => {
        if (props.direction === 'right') {
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
                <img className="smallPhoto" src={profilePhoto} />
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