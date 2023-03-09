import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries';
import { UPLOAD_IMAGE } from "../utils/mutations";
import { Image, Transformation } from "cloudinary-react";
import profileIcon from "../assets/profile-icon.svg";

const UploadImage = () => {
  const { register, handleSubmit } = useForm();
  const [uploadImage, { error }] = useMutation(UPLOAD_IMAGE);
  const [imageId, setImageId] = useState("");

  const { loading, data } = useQuery(GET_ME);
  const me = data?.me || {};

  useEffect(() => {
    if (me.image) {
      let newImage = `${me.image}.png`;
      setImageId(newImage)
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

      let newImage = `${image}.png`
      setImageId(newImage)

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="uploadPhotoForm" onSubmit={handleSubmit(submit)}>
        <label htmlFor="file-input">

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
            alt="Prof pic"
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
