import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    let navigate=useNavigate()
    let [otp,setOtp]=useState("")
    let [error,setError]=useState("")
    async function handleReset(){
        let token = localStorage.getItem("token")
        let string={
            string:otp
        }
        let response=await fetch(`https://password-reset-backend-zztf.vercel.app/reset/resets`,{
          method:"POST",
          body:JSON.stringify(string),
          headers:{
            "Content-type":"application/json",
            "x-auth" : token
          }
        });
        let data=await response.json()
        console.log(token)
        if(data.message==="Valid String"){
          setError("")
          localStorage.setItem("token",data.token)
          navigate("/reset")
        }
        else{
          setError(data.message)
        }
      
    }

  return (
    <div className='forgot-container'>
        <div className='forgot_body'>
        <h1 id="forgot_head">OTP</h1>
      <form className={"forgot_form"}>
      <TextField label="OTP" variant="filled" className={"forgot_field"}
      placeholder="Enter your OTP" required 
      value={otp}
      onChange={(e)=>setOtp(e.target.value)}/>
      <br/>

    </form>
     <div className='forgot_button'>
        <Button type="submit" variant="contained" color="primary"
        onClick={handleReset}>
          Submit
        </Button>
     </div>
     {error?
     <Typography>
     {error}
    </Typography>:
    ""}
     </div>
    </div>
  )
}

export default Otp