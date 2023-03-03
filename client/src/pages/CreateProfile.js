import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';

import Auth from '../utils/auth';
import { ADD_PROFILE } from '../utils/mutations';

const styles = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px'
    },
    input: {
        margin: '10px 0',
        width: '100%',
        maxWidth: '300px'
    },
    p: {
        margin: '10px 0'
    }
};


const ProfileForm = () => {
    Auth.loggedIn();

    const { register, handleSubmit } = useForm();

    const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

    const onSubmit = async (profile, event) => {
        console.log(profile);
        try {
            const { data } = await addProfile({
                variables: { profile },
            });
            console.log(data);
            Auth.login(data.addProfile.token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <label>Age</label>
                <input {...register('age')}
                />
                <label>Gender</label>
                <input {...register('gender')}
                />
                <label>Height</label>
                <input {...register('height')}
                />
                <label>Religion</label>
                <input {...register('religion')}
                />
                <label>Politics</label>
                <input {...register('politics')}
                />
                <label>Bio</label>
                <textarea {...register('bio')}
                />
                <label>Smoking</label>
                <input {...register('smoking')}
                />
                <label>Drinking</label>
                <input {...register('drinking')}
                />
                <input type='submit' />
                <p>{data}</p>
            </form>

            <button>Next</button>
        </div>

    )
};

export default ProfileForm;