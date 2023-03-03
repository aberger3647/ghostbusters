import React, { useState } from "react";
import Auth from "../utils/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Navigate } from "react-router-dom";

const SignUpForm = () => {
  const { register, handleSubmit } = useForm();
  const [signup, { error, data }] = useMutation(ADD_USER);
  const [isHover, setIsHover] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const { data } = await signup({
        variables: {
          email: formData.email,
          firstName: formData.firstName,
          password: formData.password,
        },
      });

      Auth.login(data.addUser.token);
      console.log("signed up");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {Auth.loggedIn() && <Navigate to="/preferences" />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} placeholder="First Name" />
        <input
          {...register("email", {
            pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
          })}
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
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
