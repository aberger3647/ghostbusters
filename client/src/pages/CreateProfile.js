import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Auth from '../utils/auth';

const ProfileForm = () => {
    Auth.loggedIn();

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState('');

    return (
        <div>
            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <label>Age</label>
                <input {...register('age')} />
                <label>Gender</label>
                <input {...register('gender')} />
                <label>Height</label>
                <input {...register('height')} />
                <label>Work</label>
                <input {...register('work')} />
                <label>Religion</label>
                <input {...register('religion')} />
                <label>Politics</label>
                <input {...register('politics')} />
                <label>Bio</label>
                <textarea {...register('bio')} />
                <label>Smoking</label>
                <input {...register('smoking')} />
                <label>Drinking</label>
                <input {...register('drinking')} />
                <input type='submit' />
                <p>{data}</p>
            </form>

            <button>Next</button>
        </div>

    )
};

export default ProfileForm;