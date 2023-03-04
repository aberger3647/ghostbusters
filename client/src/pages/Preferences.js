import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom'
import Auth from '../utils/auth';

const PreferencesForm = () => {
    const handleLogout = () => {
        Auth.logout();
    };

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState('');

    return (
        <div>
            {!Auth.loggedIn() && <Navigate to='/login'/>}
            <h2>A FORM</h2>
            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <input {...register('age')} />
                <input {...register('gender')} />
                <input {...register('height')} />
                <input {...register('religion')} />
                <input {...register('politics')} />
                <input {...register('smoking')} />
                <input {...register('drinking')} />
                <p>{data}</p>
                <input type='submit' />
            </form>

            <button>Next</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default PreferencesForm;