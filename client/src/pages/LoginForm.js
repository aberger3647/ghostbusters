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
    
    const handleActivePage = () => {
      const links = document.getElementsByTagName('a');
      const signupLink = links[0];
      const loginLink = links[1];
      if (window.location.pathname === '/') {
        console.log('signup', signupLink)
        signupLink.addClassName('active');
        if (loginLink.classList.contains('active'))
        loginLink.classList.remove('active');
      }
      if (window.location.pathname === '/login') {
        loginLink.addClassName('active');
        if(signupLink.classList.contains('active')) {
          signupLink.classList.remove('active');
        }
      }
  }

    return (
        <div className='formContainer'>
            {Auth.loggedIn() && (
              <Navigate to="/explore" />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Ghostbusters</h1>

                <div className='signupLogin'>
                  <a href
                    onClick={() => setActiveTab('signup')}>
                    <h2>Sign Up</h2>
                  </a>
                  <a href
                    onClick={() => setActiveTab('login')}>
                    <h2>Log In</h2>
                  </a>
                </div>

                <input {...register("email", { pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ })} placeholder='Email Address'/>
                <input type="password" {...register("password")} placeholder='Password'/>
                
                <button
                  type="submit"
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  ><h5>Log In</h5></button>
                <p>{data}</p>
            </form>
        </div>
    )

}

export default LoginForm;