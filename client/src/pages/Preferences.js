import React from 'react';
import { useState } from 'react';
import { useForm } from 'react';

import Auth from '../utils/auth';

const PreferencesForm = () => {
    Auth.loggedIn();

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState('');

    return (
        <div>
            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <input {...register('age')} />
                <input {...register('gender')} />
                <input {...register('height')} />
                <input {...register('religion')} />
                <input {...register('politics')} />
                <input {...register('smoking')} />
                <input {...register('drinking')} />
                <input type='submit' />
            </form>

            <button>Next</button>
        </div>
    )
};

export default PreferencesForm;