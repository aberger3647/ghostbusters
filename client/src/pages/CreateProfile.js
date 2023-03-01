import React from 'react';
import { useState } from 'react';
import { useForm } from 'react';

import Auth from '../utils/auth'

const ProfileForm = () => {
    Auth.loggedIn();

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState('');

    return (
        <div>
            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <input {...register('age')} />
                <input {...register('gender')} />
                <input {...register('height')} />
                <input {...register('work')} />
                <input {...register('religion')} />
                <input {...register('politics')} />
                <textarea {...register('bio')} />
                <input {...register('age')} />
                <input type='submit' />
                <p>{data}</p>
            </form>

            <button>Next</button>
        </div>

    )
}