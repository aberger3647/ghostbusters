import React, { useState, useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import { GET_ME } from '../utils/queries';
import { useQuery } from "@apollo/client";

const ItsAMatch = (props) => {
  const [name, setName] = useState(["Jessica", "Marcus"]);
  const [imageId, setImageId] = useState("");

  const { loading, data } = useQuery(GET_ME);
  console.log("data", data);
  const me = data?.me || {};
  const profile = data?.me.profile || {};

useEffect(() => {
    if (me) {
        let newImage = `${me.image}.png`
        setImageId(newImage)
    }
}, [me])

  const closeModal = () => {
    const modal = document.querySelector(".itsAMatch");
    modal.style.display = "none";
  };

  return (
    <div className="formContainer itsAMatch">
      <h1>it's a match!</h1>
      <h2>{name[0]}</h2>

      <Image
        className="mediumPhoto topPhoto"
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={imageId}
        alt="Match pic"
      >
        <Transformation
          width="345"
          height="345"
          gravity="face"
          radius="max"
          crop="fill"
        />
      </Image>

      <Image
        className="mediumPhoto botPhoto"
        cloudName={process.env.REACT_APP_CLOUD_NAME}
        publicId={imageId}
        alt='Prof pic'
      >
        <Transformation
          width="345"
          height="345"
          gravity="face"
          radius="max"
          crop="fill"
        />
      </Image>

      <h2>{name[1]}</h2>
      <button id="close" onClick={closeModal}>
        {" "}
        <h5>Close</h5>
      </button>
    </div>
  );
};

export default ItsAMatch;
