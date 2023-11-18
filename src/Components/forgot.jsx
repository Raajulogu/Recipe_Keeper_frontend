import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forgot = () => {
  let navigate=useNavigate()
  let [email,setEmail]=useState("")
  let [error,setError]=useState("")

  async function handleForgot(){
    let userEmail={
      email
    }
    let response=await fetch(`https://password-reset-backend-zztf.vercel.app/forgot/mail`,{
      method:"POST",
      body:JSON.stringify(userEmail),
      headers:{
        "Content-type":"application/json"
      }
    });
    let data =await response.json()
    if(data.token){
      setError("")
      localStorage.setItem("token",data.token)
      navigate(`/otp`)
    }
    else{
      setError(data.message)
    }
  }
 

  return (
    <div className='forgot-container'>   
     <div className='forgot_body'>
        <h1 id="forgot_head">Email</h1>
      <form className={"forgot_form"}>
      <TextField label="Email" variant="filled" className={"forgot_field"}
      placeholder="Enter your Email" required 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}/>
      <br/>

    </form>
     <div className='forgot_button'>
        <Button type="submit" variant="contained" color="primary"
        onClick={handleForgot}>
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

export default Forgot