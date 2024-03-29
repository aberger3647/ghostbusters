import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Auth from '../utils/auth';
import { ADD_PREFERENCE } from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const PreferencesForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [addPreference, { error, data }] = useMutation(ADD_PREFERENCE);

  const onSubmit = async (preference, event) => {
    try {
      const { data } = await addPreference({
        variables: { preference },
      });
      // setFormState(preference);
      if (data) {
        navigate('/profile');
      }
    } catch (err) {
      console.error(err)
    }
  }

  const navigate = useNavigate();

  return (
    <>
      {!Auth.loggedIn() && <Navigate to='/login' />}
      <Header title="preferences" />
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='heightPrefs'>
            <input type="number" className='minMaxAge' {...register('minAge', { valueAsNumber: true, required: true, validate: (value) => value >= 18 || 'Must be at least 18 years old' })} placeholder='Min Age' />
            <h4>to</h4>
            <input type="number" className='minMaxAge' {...register('maxAge', { valueAsNumber: true, required: true })} placeholder='Max Age' />
          </div>
          {errors.minAge && errors.minAge.type === "validate" && <small>{errors.minAge.message}</small>}
          {errors.minAge && errors.maxAge && <small>Both fields are required</small>}

          <select {...register('gender', { required: true })} >
            <option value=''>Gender...</option>
            <option value='F'>Female</option>
            <option value='M'>Male</option>
            <option value='NB'>Non-Binary</option>
          </select>
          {errors.gender && <small>This field is required</small>}

          <div className='heightPrefs'>
            <select className='minMaxHeight' {...register('minHeight', { required: true })} >
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
            <select className='minMaxHeight' {...register('maxHeight', { required: true })} >
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
          {errors.minHeight && errors.maxHeight && <small>Both fields are required</small>}


          <select {...register('religion', { required: true })} >
            <option value=''>Religion...</option>
            <option value='Agnostic/Atheist'>Agnostic/Atheist</option>
            <option value='Buddhist'>Buddhist</option>
            <option value='Christian'>Christian</option>
            <option value='Hindu'>Hindu</option>
            <option value='Jewish'>Jewish</option>
            <option value='Spiritual'>Spiritual</option>
          </select>
          {errors.religion && <small>This field is required</small>}

          <select {...register('politics', { required: true })} >
            <option value=''>Politics...</option>
            <option value='Conservative'>Conservative</option>
            <option value='Moderate'>Moderate</option>
            <option value='Liberal'>Liberal</option>
          </select>
          {errors.politics && <small>This field is required</small>}

          <select {...register('smoking', { required: true })} >
            <option value=''>Smoking...</option>
            <option value='Smokes'>Smokes</option>
            <option value='Doesn&#39;t Smoke'>Doesn't smoke</option>
          </select>
          {errors.smoking && <small>This field is required</small>}

          <select {...register('drinking', { required: true })} >
            <option value=''>Drinking...</option>
            <option value='Drinks'>Drinks</option>
            <option value='Doesn&#39;t Drink'>Doesn't drink</option>
          </select>
          {errors.drinking && <small>This field is required</small>}

          <input type="submit" value="Submit" className="createPrefsNext" />
        </form>
      </div>
    </>
  )
};

export default PreferencesForm;
