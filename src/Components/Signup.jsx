import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./Signup.css";

//Validation Schema
let fieldValidationSchema = yup.object({
  name: yup.string().required("Please enter your Username!"),
  password: yup.string().required("Please enter your Password!"),
  email: yup.string().required("Please enter your Email!"),
  contact: yup.string().required("Please enter your Contact!"),
});
const Signup = () => {
  let navigate = useNavigate();
  let [error, setError] = useState("");

  let { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      contact: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (user) => {
      handleSignUp(user);
    },
  });
  //handle SignUp
  async function handleSignUp(user) {
    let response = await fetch(
      `https://recipe-keeper-backend.vercel.app/api/user/signup`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    let data = await response.json();
    if (data.token) {
      setError("");
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", values.email);
      navigate("/");
    } else {
      setError(data.message);
    }
  }
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <br />
        <form onSubmit={handleSubmit} className="signup-form">
          <TextField
            name="name"
            type="name"
            value={values.name}
            label="Name"
            onChange={handleChange}
          />
          {errors.name ? (
            <div style={{ color: "crimson" }}>{errors.name}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="email"
            type="email"
            value={values.email}
            label="Email"
            onChange={handleChange}
          />
          {errors.email ? (
            <div style={{ color: "crimson" }}>{errors.email}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="contact"
            type="contact"
            value={values.contact}
            label="Contact"
            onChange={handleChange}
          />
          {errors.contact ? (
            <div style={{ color: "crimson" }}>{errors.contact}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="password"
            type="password"
            value={values.password}
            label="password"
            onChange={handleChange}
          />
          {errors.password ? (
            <div style={{ color: "crimson" }}>{errors.password}</div>
          ) : (
            ""
          )}
          <br />
          <div id="submit-btn">
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
        <br />
        <div>
          <p id="log-btn">
            Already have an account? <a href="/login">Log In</a>
          </p>
          {error ? <p style={{ color: "crimson" }}>{error} !</p> : ""}
        </div>
      </div>
    </div>
  );
};

export default Signup;
