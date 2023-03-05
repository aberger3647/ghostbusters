import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { UPLOAD_IMAGE } from "../utils/mutations";
import { Image } from "cloudinary-react";
import profileIcon from "../assets/profile-icon.svg";

const UploadImage = () => {
  const { register, handleSubmit } = useForm();
  const [uploadImage, { error }] = useMutation(UPLOAD_IMAGE);
  const [imageId, setImageId] = useState("");

  const { loading, data } = useQuery(GET_ME);
  console.log("data", data);
  const me = data?.me || {};
  const profile = data?.me.profile || {};

useEffect(() => {
    if (me) {
        setImageId(me.image)
    }
}, [me])

  const submit = async (data, e) => {
    e.preventDefault();

    const file = data.image[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    const image = response.data.public_id;

    if (!image) {
      return false;
    }

    try {
      await uploadImage({
        variables: { image: image },
      });

      setImageId(image);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="uploadPhotoForm" onSubmit={handleSubmit(submit)}>
        <label for="file-input">
          <span id="profPic"></span>
          {!imageId ? (
            <img
              src={profileIcon}
              alt="Upload profile icon"
              className="profileIcon"
            />
          ) : (
            <Image
              className="mediumPhoto"
              cloudName={process.env.REACT_APP_CLOUD_NAME}
              publicId={imageId}
            />
          )}
        </label>
        <input
          id="file-input"
          hidden
          className="uploadPhoto"
          accept="image/*"
          type="file"
          {...register("image")}
        />

        <button type="submit">Save Photo</button>
      </form>
    </>
  );
};

export default UploadImage;
