import React, { useState, useEffect } from 'react';
import profilePhoto from '../assets/profile-icon.svg'

const Review = (props) => {

    const [containerDirection, setContainerDirection] = useState({})

    useEffect(() => {
        if (props.direction === 'right' ) {
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
            <h4>Dan</h4>
            <h5>I had a great time with Jessica! She is sweet, fun, and loves to laugh.</h5>
            </div>
        </div>
        <hr/>
        </>
    )
};

export default Review;