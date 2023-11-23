import React, { useState } from "react";
import "./Login.css";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

//Validation Shema
let fieldValidationSchema = yup.object({
  email: yup.string().required("Please enter your Email !"),
  password: yup.string().required("Please enter your Password !"),
});
const Login = () => {
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let { handleSubmit, handleChange, values, handleBlur, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (user) => {
      handleLogin(user);
    },
  });
  //handle Login
  async function handleLogin(user) {
    let response = await fetch(
      `https://recipe-keeper-backend.vercel.app/api/user/login`,
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
    <div className="log-container">
      <div className="log-box">
        <h2>Log In</h2>
        <br />
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            name="email"
            type="email"
            onBlur={handleBlur}
            value={values.email}
            label="Email"
            onChange={handleChange}
          />
          <br />
          {errors.email ? (
            <div style={{ color: "crimson" }}>{errors.email}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="password"
            type="password"
            onBlur={handleBlur}
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
          <a href="/reset" id="forgot">
            forgot password ?
          </a>
          <br />
          <div>
            <div id="submit-btn">
              <Button variant="contained" type="submit">
                Log In
              </Button>
            </div>
          </div>
        </form>
        <br />
        <p id="sign-btn">
          Don't have an account? <a href="/signup">SignUp</a>
        </p>
        {error !== "" ? <div style={{ color: "crimson" }}>{error}</div> : ""}
      </div>
    </div>
  );
};

export default Login;
