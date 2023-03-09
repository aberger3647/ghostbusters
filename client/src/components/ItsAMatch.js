import React, { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import { GET_ME } from '../utils/queries';
import { useQuery } from "@apollo/client";

const ItsAMatch = (props) => {
  const [name, setName] = useState(["Jessica", "Marcus"]);
  const [imageId, setImageId] = useState("");

  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};
  const profile = data?.me.profile || {};

const [meImage, setMeImage] = useState();
const [userImage, setUserImage] = useState();

  useEffect(() => {
    if (props) {
      let newMeImage = `${props.me.image}.png`
      setMeImage(newMeImage)
      let newUserImage = `${props.user.image}.png`
      setUserImage(newUserImage)
    }
  }, [props])

  const closeModal = () => {
    const modal = document.querySelector(".itsAMatch");
    modal.style.display = "none";
  };

  return (
    <div className="formContainer itsAMatch">
      <h1>it's a match!</h1>
      <h2>{props.user.firstName}</h2>

      <Image
        className="mediumPhoto topPhoto"
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={userImage}
        alt="Match pic"
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

      <Image
        className="mediumPhoto botPhoto"
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={meImage}
        alt='Prof pic'
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

      <h2>{props.me.firstName}</h2>
      <button id="close" onClick={closeModal}>
        {" "}
        <h5>Close</h5>
      </button>
    </div>
  );
};

export default ItsAMatch;
