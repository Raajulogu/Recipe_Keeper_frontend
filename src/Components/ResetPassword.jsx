import React, { useState } from 'react'
import "./ResetPassword.css"
import { Button, TextField } from '@mui/material'
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import emailjs from 'emailjs-com';


//Form validation
let fieldValidationSchema=yup.object({
    email:yup.string().required("Please enter your Email !"),
    password:yup.string().required("Please enter your Password !"),
    newpassword:yup.string().required("Please confirm your Password !")
  })

// Password Reset Component
const ResetPassword = () => {
  let [value,setValue]=useState(false);
  let [user,setUser]=useState("")
  return (
    <div className='container-fluid reset-container'>
      <div className='row reset-main'>
        <div className='col reset-column'>
          {value===true ? 
          <NewPassword
          user={user}
          setUser={setUser}
          />:
          <Email 
          value={value}
          setValue={setValue}
          user={user}
          setUser={setUser}
          />
          }
        </div>
      </div>
    </div>
  )
}

// Component for send OTP
function Email({value,setValue,user,setUser}){

    let [error,setError]=useState("")
    let [encrypt,setEncrypt]=useState("")
    let [otp,setOtp]=useState("")
    let {handleChange,values,errors}=useFormik({
        initialValues:{
              email:"",
            },
            validationSchema:fieldValidationSchema,
            onSubmit:(user)=>{
              
            }
      })
    //Send OTP
    function sendOtp(e){
      let msg=String(Math.floor(Math.random()*(9999-1000)));
        (function() {
            emailjs.init("NL09kZCZYeYFmZSgt"); //please encrypted user id for malicious attacks
          })();

          var templateParams = {
            to_name: 'rajeshkumarlogu145@gmail.com',
            from_name: values.email,
            message_html: msg
          };
        
          emailjs.send('service_5tm7opw', 'template_ebkvuvq', templateParams)
            .then(function(response) {
              console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
              console.log('FAILED...', error);
            });
            setEncrypt(msg)
      }
      //Handle OTP
      function handleOtp(e){
        if(otp===encrypt){
          setUser(values.email);
          setValue(true)
          setError("")
        }
        else{
          setError("Invalid Otp")
          console.log(value)
        }
      }

    return(
        <div className='reset-box'>
            
            <form 
            className='reset-form'>
                <h1>Enter your email</h1>
            <div className='otp-confirmation'>
            <TextField
              name="email"
              type='email'
              value={values.email}
              label="Email"
              onChange={handleChange}
            />
            {errors.email ?
              <div style={{color:"crimson"}}>{errors.email}</div>
              :""
            }
            <br/>
            <Button
            variant='contained'
            onClick={()=>sendOtp()}
            >
              Send OTP
            </Button>
            </div>
            <br/>
            <h1>Enter OTP</h1>
           <div className='otp-confirmation'>
           
            <TextField
              name="otp"
              type='otp'
              label="OTP"
              onChange={(e)=>setOtp(e.target.value)}
            />
            <br/>
            <Button
            variant='contained'
            onClick={()=>handleOtp()}
            >
              Confirm
            </Button>
           </div>
           {
                error ? <div style={{color:"crimson"}}>{error} !</div>
                :""
            }
            </form>
            <br/>
          </div>
    )
}
//Component for Create New Password
function NewPassword({user,setUser}){

    let navigate=useNavigate();
    let [error,setError]=useState("")
    let {handleChange,values,errors}=useFormik({
        initialValues:{
              password:"",
              newpassword:""
            },
            validationSchema:fieldValidationSchema,
            onSubmit:(e)=>{
            
            }
    })
    async function handlePassword(obj){
      if(values.password===values.newpassword){
        let obj={
          email:user,
          password:values.password
        }
        let response=await fetch(`https://recipe-keeper-backend.vercel.app/api/user/reset`,{
        method:"PUT",
        body:JSON.stringify(obj),
        headers:{
          "Content-type":"application/json"
        }
      });
      navigate("/login")
      }
      else{
        setError("Password does not match")
      }
      
    }
    return(
        <div className='reset-box'>
            <h1>Create New Password</h1>
            <form 
            className='reset-form'>
            <TextField
              name="password"
              type='password'
              value={values.password}
              label="New Password"
              onChange={handleChange}
            />
            {errors.password ?
              <div style={{color:"crimson"}}>{errors.password}</div>
              :""
            }
            <br/>
            <TextField
              name="newpassword"
              type='newpassword'
              value={values.newpassword}
              label="Confirm Password"
              onChange={handleChange}
            />
            <br/>
            {
                error ? <div style={{color:"crimson"}}>{error} !</div>
                :""
            }
            <div>
            <Button
            variant='contained'
            onClick={handlePassword}
            >
              Reset 
            </Button>
            </div>
            </form>
            <br/>
          </div>
    )
}

export default ResetPassword