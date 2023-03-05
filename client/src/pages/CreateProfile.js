import { useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import profileIcon from '../assets/profile-icon.svg'
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ADD_PROFILE } from '../utils/mutations';

const ProfileForm = () => {
    
    const { register, handleSubmit } = useForm();
    
    const [addProfile, { error, data }] = useMutation(ADD_PROFILE);
    
    const navigate = useNavigate();
    
    const onSubmit = async (profile, event) => {
        try {
            const { data } = await addProfile({
                variables: { profile },
            });
            navigate('/preferences');
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        
        <div className='contentContainer'>
            {!Auth.loggedIn() &&  <Navigate to='/login' /> }
            <Header title="edit profile" />
            
            <h2>Name</h2>
            <div className='formContainer'>

                <img src={profileIcon} alt='Upload profile icon' className='profileIcon' />
                <button>Upload Photo</button>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input {...register('age')}
                        placeholder='Age'
                    />

                    <select {...register('gender', { required: true })}>
                        <option value=''>Gender...</option>
                        <option value='Female'>Female</option>
                        <option value='Male'>Male</option>
                        <option value='Non-Binary'>Non-Binary</option>
                    </select>

                    <select {...register('height', { required: true })}>
                        <option value=''>Height...</option>
                        <option value='45'>4'5"</option>
                        <option value='46'>4'6"</option>
                        <option value='47'>4'7"</option>
                        <option value='48'>4'8"</option>
                        <option value='49'>4'9"</option>
                        <option value='410'>4'10"</option>
                        <option value='411'>4'11"</option>
                        <option value='50'>5'0"</option>
                        <option value='51'>5'1"</option>
                        <option value='52'>5'2"</option>
                        <option value='53'>5'3"</option>
                        <option value='54'>5'4"</option>
                        <option value='55'>5'5"</option>
                        <option value='56'>5'6"</option>
                        <option value='57'>5'7"</option>
                        <option value='58'>5'8"</option>
                        <option value='59'>5'9"</option>
                        <option value='510'>5'10"</option>
                        <option value='511'>5'11"</option>
                        <option value='6'>6'0"</option>
                        <option value='61'>6'1"</option>
                        <option value='62'>6'2"</option>
                        <option value='63'>6'3"</option>
                        <option value='64'>6'4"</option>
                        <option value='65'>6'5"</option>
                        <option value='66'>6'6"</option>
                        <option value='67'>6'7"</option>
                    </select>

                    <select {...register('religion', { required: true })}>
                        <option value=''>Religion...</option>
                        <option value='Agnostic/Atheist'>Agnostic/Atheist</option>
                        <option value='Buddhist'>Buddhist</option>
                        <option value='Christian'>Christian</option>
                        <option value='Hindu'>Hindu</option>
                        <option value='Jewish'>Jewish</option>
                        <option value='Spiritual'>Spiritual</option>
                    </select>

                    <select {...register('politics', { required: true })}>
                        <option value=''>Politics...</option>
                        <option value='Conservative'>Conservative</option>
                        <option value='Moderate'>Moderate</option>
                        <option value='Liberal'>Liberal</option>
                    </select>

                    <select {...register('smoking', { required: true })}>
                        <option value=''>Smoking...</option>
                        <option value='Smokes'>Smokes</option>
                        <option value='Doesnt Smoke'>Doesn't smoke</option>
                    </select>

                    <select {...register('drinking', { required: true })}>
                        <option value=''>Drinking...</option>
                        <option value='Drinks'>Drinks</option>
                        <option value='Doesnt Drink'>Doesn't drink</option>
                    </select>

                    <textarea {...register('bio')}
                        placeholder='Bio'
                    />

                    <input type='submit' value='Next' />
                </form>
            </div>
        </div>
    )
};

export default ProfileForm;