import React from 'react';
import Auth from '../utils/auth'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Navigate } from 'react-router-dom'


const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const onSubmit = async (formData, event) => {
    try {
      const { data } = await login({
        variables: { ...formData },
      });
      Auth.login(data.login.token);
      console.log('logged in')
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
      {Auth.loggedIn() && (
        <Navigate to="/explore" />
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <label>Email:</label>
        <input {...register("email", { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} style={styles.input} />
        <label>Password:</label>
        <input type="password" {...register("password")} style={styles.input} />
        <input type="submit" />
        <p style={styles.p}>{data}</p>
      </form>
    </div>
  )

}

export default LoginForm;