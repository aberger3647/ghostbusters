import React, { useState } from 'react';
import Auth from '../utils/auth'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Navigate } from 'react-router-dom'

import SignUpForm from './SignUpForm';

const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [isHover, setIsHover] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const [showSignUp, setShowSignUp] = useState(false);

    function handleSignUp() {
      setShowSignUp(true);
    }

    function handleLogin() {
      setShowSignUp(false);
    }

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
      }
    };

    return (
        <div className='formContainer'>
            {Auth.loggedIn() && (
              <Navigate to="/explore" />
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Ghostbusters</h1>

                <div className='signupLogin'>
                  <button
                      style={{...styles.button, ...(activeTab === 'signup' && styles.activeButton)}}
                      onClick={() => {
                        setActiveTab('signup');
                        handleSignUp();
                      }}>
                      <h2>Sign Up</h2>
                      </button>

                    <button
                      style={{...styles.button, ...(activeTab === 'login' && styles.activeButton)}}
                      onClick={() => {
                        setActiveTab('login');
                        handleLogin();
                      }}>
                      <h2>Log In</h2>
                    </button>
                </div>

                {showSignUp ? (
                  <SignUpForm />
                ) : (
                <>  
                <input {...register("email", { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} placeholder='Email Address'/>
                <input type="password" {...register("password")} placeholder='Password'/>
                
                <button
                  type="submit"
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  ><h5>Log In</h5></button>
                <p>{data}</p>
                </>
                )}
            </form>
        </div>
    )

}

export default LoginForm;