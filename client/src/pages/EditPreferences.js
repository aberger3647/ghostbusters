import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Auth from '../utils/auth';
import { EDIT_PREFERENCE } from '../utils/mutations';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const EditPreferences = () => {
    const { register, handleSubmit, reset } = useForm();
    const { loading, data: userData } = useQuery(GET_ME, {
        onCompleted: (data) => {
            console.log('got data from graphql', data.me.preference);
            reset(data.me.preference);
        }
    });

  const [editPreference, { error, data }] = useMutation(EDIT_PREFERENCE);

    const onSubmit = async (formData) => {
        // removes typename from variables so mutation doesn't include __typename
        const {__typename: _, ...preference } = formData;
        console.log('sending preferences', preference);
        try {
            const { data } = await editPreference({
                variables: { preference },
            });
            alert('saved preferences');
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <>
    { !Auth.loggedIn() && <Navigate to='/login' />}
      <Header title="preferences" />
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>

                <div className='heightPrefs'>
                    <input className='minMaxAge' {...register('minAge')} placeholder='Min Age' />
                    <p>to</p>
                    <input className='minMaxAge' {...register('maxAge')} placeholder='Max Age' />
                    </div>

                    <select {...register('gender', { required: true })} >
                        <option value=''>Gender...</option>
                        <option value='Female'>Female</option>
                        <option value='Male'>Male</option>
                        <option value='Non-Binary'>Non-Binary</option>
                    </select>
                    <div className='heightPrefs'>
                        <select className='minMaxHeight' {...register('minHeight')} >
                            <option value=''>Min Height</option>
                            <option value="I don't care">I don't care</option>
                            <option value="4'5&quot;">4'5"</option>
                            <option value="4'6&quot;">4'6"</option>
                            <option value="4'7&quot;">4'7"</option>
                            <option value="4'8&quot;">4'8"</option>
                            <option value="4'9&quot;">4'9"</option>
                            <option value="4'10&quot;">4'10"</option>
                            <option value="4'11&quot;">4'11"</option>
                            <option value="5'0&quot;">5'0"</option>
                            <option value="5'1&quot;">5'1"</option>
                            <option value="5'2&quot;">5'2"</option>
                            <option value="5'3&quot;">5'3"</option>
                            <option value="5'4&quot;">5'4"</option>
                            <option value="5'5&quot;">5'5"</option>
                            <option value="5'6&quot;">5'6"</option>
                            <option value="5'7&quot;">5'7"</option>
                            <option value="5'8&quot;">5'8"</option>
                            <option value="5'9&quot;">5'9"</option>
                            <option value="5'10&quot;">5'10"</option>
                            <option value="5'11&quot;">5'11"</option>
                            <option value="6'0&quot;">6'0"</option>
                            <option value="6'1&quot;">6'1"</option>
                            <option value="6'2&quot;">6'2"</option>
                            <option value="6'3&quot;">6'3"</option>
                            <option value="6'4&quot;">6'4"</option>
                            <option value="6'5&quot;">6'5"</option>
                            <option value="6'6&quot;">6'6"</option>
                            <option value="6'7&quot;">6'7"</option>
                        </select>
                        <h4>to</h4>
                        <select className='minMaxHeight' {...register('maxHeight')} >
                            <option value=''>Max Height</option>
                            <option value="I don't care">I don't care</option>
                            <option value="4'5&quot;">4'5"</option>
                            <option value="4'6&quot;">4'6"</option>
                            <option value="4'7&quot;">4'7"</option>
                            <option value="4'8&quot;">4'8"</option>
                            <option value="4'9&quot;">4'9"</option>
                            <option value="4'10&quot;">4'10"</option>
                            <option value="4'11&quot;">4'11"</option>
                            <option value="5'0&quot;">5'0"</option>
                            <option value="5'1&quot;">5'1"</option>
                            <option value="5'2&quot;">5'2"</option>
                            <option value="5'3&quot;">5'3"</option>
                            <option value="5'4&quot;">5'4"</option>
                            <option value="5'5&quot;">5'5"</option>
                            <option value="5'6&quot;">5'6"</option>
                            <option value="5'7&quot;">5'7"</option>
                            <option value="5'8&quot;">5'8"</option>
                            <option value="5'9&quot;">5'9"</option>
                            <option value="5'10&quot;">5'10"</option>
                            <option value="5'11&quot;">5'11"</option>
                            <option value="6'0&quot;">6'0"</option>
                            <option value="6'1&quot;">6'1"</option>
                            <option value="6'2&quot;">6'2"</option>
                            <option value="6'3&quot;">6'3"</option>
                            <option value="6'4&quot;">6'4"</option>
                            <option value="6'5&quot;">6'5"</option>
                            <option value="6'6&quot;">6'6"</option>
                            <option value="6'7&quot;">6'7"</option>
                        </select>
                    </div>

                    <select {...register('religion', { required: true })} >
                        <option value=''>Religion...</option>
                        <option value='Agnostic/Atheist'>Agnostic/Atheist</option>
                        <option value='Buddhist'>Buddhist</option>
                        <option value='Christian'>Christian</option>
                        <option value='Hindu'>Hindu</option>
                        <option value='Jewish'>Jewish</option>
                        <option value='Spiritual'>Spiritual</option>
                    </select>

                    <select {...register('politics', { required: true })} >
                        <option value=''>Politics...</option>
                        <option value='Conservative'>Conservative</option>
                        <option value='Moderate'>Moderate</option>
                        <option value='Liberal'>Liberal</option>
                    </select>

                    <select {...register('smoking', { required: true })} >
                        <option value=''>Smoking...</option>
                        <option value='Smokes'>Smokes</option>
                        <option value='Doesnt Smoke'>Doesn't smoke</option>
                    </select>

                    <select {...register('drinking', { required: true })} >
                        <option value=''>Drinking...</option>
                        <option value='Drinks'>Drinks</option>
                        <option value='Doesnt Drink'>Doesn't drink</option>
                    </select>

                    <input type="submit" value="Submit" className="createPrefsNext" />
                </form>
            </div>
        </>
    )
};

export default EditPreferences;
