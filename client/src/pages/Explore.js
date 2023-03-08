import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import Header from "../components/Header";
import ItsAMatch from "../components/ItsAMatch";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ADD_DISLIKE, ADD_LIKE } from "../utils/mutations";
import { Image, Transformation } from "cloudinary-react";

const Explore = () => {
    { !Auth.loggedIn() && <Navigate to='/login' /> }

    const [randomNumber, setRandomNumber] = useState(0);

    const [match1, setMatch1] = useState({});
    const [match2, setMatch2] = useState({});


    const { loading, data } = useQuery(GET_USER);

    const users = data?.users || [];

    const { loading: meLoading, data: meData } = useQuery(GET_ME);
    console.log("me", meData);
    const me = meData?.me || {};

  const [addDislike, { data: dislikeData }] = useMutation(ADD_DISLIKE);
  const [addLike, { data: likeData }] = useMutation(ADD_LIKE);

  const [imageId, setImageId] = useState("");

  useEffect(() => {
    if (users) {
      let newImage = `${users[randomNumber]?.image}.png`;
      setImageId(newImage);
    }
  }, [users]);

  const onDislikeClick = async (event) => {
    const id = event.target.id;
    try {
      const { data } = await addDislike({
        variables: {
          userId: id,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    const randomIndex = Math.floor(Math.random() * users.length);

    setRandomNumber(randomIndex);
  };

  const onLikeClick = async (event) => {
    const id = event.target.id;

        try {
            const { data: matchData } = await addLike({
                variables: {
                    userId: id,
                }
            });

            const matches = matchData.addLike.matches;
            console.log("matches", matches);

            if (matchData.addLike.matches.length) {
                for (var i = 0; i < matches.length; i++) {
                    if (matches[i]._id.includes(me._id)) {
                        setMatch1(me);
                        setMatch2(matchData.addLike);
                        openModal();
                    }
                }
            }

            console.log("matchData", matchData);
        } catch (err) {
            console.error(err);
        }

    const randomIndex = Math.floor(Math.random() * users.length);

    setRandomNumber(randomIndex);
  };

  const openModal = () => {
    const modal = document.querySelector(".itsAMatch");
    modal.style.display = "flex";
  };

  return (
    <>
      <ItsAMatch me={match1} user={match2} />
      <div className="contentContainer">
        {!Auth.loggedIn() && <Navigate to="/login" />}
        <Header title="explore" />
        <div className="exploreContainer">
          <div key={users[randomNumber]?._id} className="exploreBox">
            <Link to={`/details/${users[randomNumber]?._id}`}>
              <Image
                className="explorePhoto"
                cloudName={process.env.REACT_APP_CLOUD_NAME}
                publicId={users[randomNumber]?.image}
                alt="Explore pic"
              >
                <Transformation
                  width="1000"
                  height="1000"
                  gravity="face"
                  radius="max"
                  crop="fill"
                  border="20px_solid_rgb:6789FF"
                />
              </Image>
            </Link>

            <h2 className="exploreName">{users[randomNumber]?.firstName}</h2>
            <div className="exploreStatContainer">
              <h3 className="exploreStats">
                {users[randomNumber]?.profile?.gender}{" "}
              </h3>
              <h3 className="exploreStats">
                {users[randomNumber]?.profile?.age}
              </h3>{" "}
              <h3 className="exploreStats">
                {users[randomNumber]?.profile?.height}
              </h3>
            </div>
            <div className="matchBtnContainer">
              <button
                id={users[randomNumber]?._id}
                key={users[randomNumber]?._id}
                onClick={onDislikeClick}
                className="dislike"
              />
              <button
                id={users[randomNumber]?._id}
                onClick={onLikeClick}
                className="like"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
