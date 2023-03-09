import React, { useState } from "react";
import Auth from "../utils/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Navigate, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [signup, { error, data }] = useMutation(ADD_USER);
  const [isHover, setIsHover] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");
  const navigate = useNavigate();
  
  const onSubmit = async (formData) => {
    try {
      const { data } = await signup({
        variables: {
          email: formData.email,
          firstName: uppercaseName(formData.firstName),
          password: formData.password,
        },
      });

      Auth.login(data.addUser.token);
      navigate('/createprofile');
    } catch (err) {
      console.error(err);
    }
  };

  const uppercaseName = (name) => {
    let firstName = name.split('');
    let firstLetter = firstName[0].toUpperCase();
    firstName.splice(0, 1, firstLetter);
	  firstName = firstName.join('')
    return firstName;
}

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className='loginInput' {...register("firstName", {required:true})} placeholder="First Name" />
        {errors.email && <small className='loginSmall'>This field is required</small>}
        
        <input
          className='loginInput'
          {...register("email", {
            pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            required: true,
          })}
          placeholder="Email"
        />
        {errors.email && <small className='loginSmall'>This field is required</small>}

        <input
              className='loginInput'
              type="password"
              {...register("password", {required: true})}
              placeholder="Password"
            />
            {errors.password && <small className='loginSmall'>This field is required</small>}

        <button
          type="submit"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <h5>Sign Up</h5>
        </button>
      </form>
    </>
  );
};

export default SignUpForm;