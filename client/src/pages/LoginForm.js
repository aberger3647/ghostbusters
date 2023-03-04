import React, { useState } from "react";
import Auth from "../utils/auth";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Navigate } from "react-router-dom";

import SignUpForm from "./SignUpForm";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [isHover, setIsHover] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [showSignUp, setShowSignUp] = useState(false);

  function handleSignUp() {
    setShowSignUp(true);
  }

  function handleLogin() {
    setShowSignUp(false);
  }

  const loginSubmit = async (formData, event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formData },
      });
      Auth.login(data.login.token);

    } catch (err) {
      console.error(err);
    }
  };

  const body = document.querySelector('body');
  body.style.margin = 0;

  const styles = {
    button: {
      border: "none",
      backgroundColor: "transparent",
      color: "white",
      padding: "10px",
      margin: "10px",
      width: "50%",
      cursor: "pointer",
      transition: "background-color 0.3s ease-in-out",
      minWidth: "150px",
    },
    activeButton: {
      border: "2px solid white",
      borderRadius: "50px",
      backgroundColor: "#623cff",
      color: "#fff",
    },
  };

  return (
    <div className="formContainer loginSignup">
      {Auth.loggedIn() && <Navigate to="/explore" />}

      <h1>Ghostbusters</h1>

      <div className="signupLogin">
        <button
          style={{
            ...styles.button,
            ...(activeTab === "signup" && styles.activeButton),
          }}
          onClick={() => {
            setActiveTab("signup");
            handleSignUp();
          }}
        >
          <h3>Sign Up</h3>
        </button>

        <button
          style={{
            ...styles.button,
            ...(activeTab === "login" && styles.activeButton),
          }}
          onClick={() => {
            setActiveTab("login");
            handleLogin();
          }}
        >
          <h3>Log In</h3>
        </button>
      </div>

      {showSignUp ? (
        <SignUpForm />
      ) : (
        <>
          <form onSubmit={handleSubmit(loginSubmit)}>
            <input
              className='loginInput'
              {...register("email", {
                pattern: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
              })}
              placeholder="Email Address"
            />
            <input
              className='loginInput'
              type="password"
              {...register("password")}
              placeholder="Password"
            />

            <button
              type="submit"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <h5>Log In</h5>
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;