import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useForm } from 'react-hook-form';

const SignUpForm = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState('');

    return (
        <>
            <h4>Sign-Up Page</h4>
            <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
                <input {...register('fullName')}/>
                <input {...register("email", { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} />
                <input type="password" {...register("password")} />
                <input type="submit" />
                <p>{data}</p>
            </form>
        </>
    )
}

export default SignUpForm;