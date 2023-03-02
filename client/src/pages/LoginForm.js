import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Navigate } from 'react-router-dom'


const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [isHover, setIsHover] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

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
      background: 'linear-gradient(to bottom, #613cff, #6788ff)',
      color: 'white',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      boxSizing: 'border-box'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '400px'
    },
    input: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '1px solid white',
      padding: '10px',
      marginBottom: '10px',
      width: '100%',
      borderRadius: '10px',
      '::placeholder': { color: 'white' }
    },
    buttonContainer: {
      display: 'flex',
      width: '100%',
      marginBottom: '10px'
    },
    button: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '1px solid white',
      borderRadius: '20px',
      padding: '10px',
      margin: '10px',
      width: '50%',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out'
    },
    activeButton: {
      backgroundColor: '#613cff',
      color: '#fff'
    },
    submitButton: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '1px solid white',
      borderRadius: '10px',
      padding: '10px',
      width: '100px',
      cursor: 'pointer',
      transition: 'opacity 0.3s ease-in-out'
    },
    submitButtonHover: {
      backgroundColor: '#613cff',
      opacity: '0.8',
      color: 'white'
    },
    h1: {
      color: 'white',
      textAlign: 'center',
    },
    h4: {
      color: 'white',
      textAlign: 'center'
    },
    p: {
      color: 'white'
    },
    };
    
    return (
        <div style={styles.formContainer}>
            {Auth.loggedIn() && (
              <Navigate to="/explore" />
            )}
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                <h1 style={styles.h1}>Ghostbusters</h1>
                <div style={styles.buttonContainer}>
                  <button
                    style={{...styles.button, ...(activeTab === 'signup' && styles.activeButton)}}
                    onClick={() => setActiveTab('signup')}>
                    Sign Up
                  </button>
                  <button
                    style={{...styles.button, ...(activeTab === 'login' && styles.activeButton)}}
                    onClick={() => setActiveTab('login')}>
                    Log In
                  </button>
                </div>
                <h4 style={styles.h4}>Log In</h4>
                <input {...register("email", { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} style={styles.input} placeholder='Email Address'/>
                <input type="password" {...register("password")} style={styles.input} placeholder='Password'/>
                <button
                  type="submit"
                  style={{ ...styles.submitButton, ...(isHover && styles.submitButtonHover) }}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  >Log In</button>
                <p style={styles.p}>{data}</p>
            </form>
        </div>
    )

}

export default LoginForm;