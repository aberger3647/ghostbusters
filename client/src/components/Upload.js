import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE } from '../utils/mutations';


const UploadImage = () => {

    const { register, handleSubmit } = useForm();
    const [uploadImage, { error }] = useMutation(UPLOAD_IMAGE);

    const submit = async (data, e) => {
        e.preventDefault();
        
        const file = data.image[0]

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            formData,
        )
            const image = response.data.public_id

            if (!image) {
                return false;
            }

        try {
            await uploadImage({
                variables: { image:image }
            })
        } catch (err) {
            console.error(err)
        }

    }

    return (
        <>

            <form onSubmit={handleSubmit(submit)}>
                <input accept="image/*" type="file" {...register("image")} />
                <input type="submit" />
            </form>
        </>
    )
}

export default UploadImage;