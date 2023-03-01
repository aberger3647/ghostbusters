import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useForm } from 'react-hook-form';



const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState('');

    const onSubmit = async (formData) => {
        try {
            const response = await Auth.login(formData.email, formData.password);
            if (!response.ok) {
              throw new Error('Cannot login.');
            }
            const { token, user } = response.data;
            Auth.login(token);
            setData('/explore');
          } catch (err) {
            console.error(err);
          }
    }

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


    return (
        <div style={styles.formContainer}>
            <h4>Login Page</h4>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <label>Email:</label>
                <input {...register("email", { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} style={styles.input}/>
                <label>Password:</label>
                <input type="password" {...register("password")} style={styles.input}/>
                <input type="submit" />
                <p style={styles.p}>{data}</p>
            </form>
        </div>
    )

}

export default LoginForm;