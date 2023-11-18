import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Reset = () => {
  let navigate=useNavigate()
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("");
  let [error,setError]=useState("");
  let [newpassword,setNewpassword]=useState("");

  async function handleNewpaasword(){
    let userDetails={
      email,
      password
    }
    if(password!==newpassword){
      setError("Password Missmatch")
    }
    else{
      let response=await fetch(`https://recipe-keeper-backend.vercel.app/api/user/reset`,{
      method:"PUT",
      body:JSON.stringify(userDetails),
      headers:{
        "Content-type":"application/json"
      }
    });
    let data=await response.json()
    console.log(data)
    if(data.message==="Password Updated"){
      localStorage.setItem("token",data.token)
      navigate("/login")
    }
    else{
      setError(data.message)
    }
    }


   
  }

  return (
    <div className='forgot-container'>
       <div className='reset_body'>
      <h1 id="reset_head">New Password</h1>
        <form className={"reset_form"}>
        <TextField label="Email" variant="filled" className={"reset_field"}
          placeholder="Enter Your Email" required 
          value={email}
      onChange={(e)=>setEmail(e.target.value)}/>
          <br/>

          <TextField label="New Password" variant="filled" className={"reset_field"}
          type="password" placeholder="Enter New Password" required 
          value={password}
      onChange={(e)=>setPassword(e.target.value)}/>
          <br/>

          <TextField label="Confirm Password" variant="filled" className={"reset_field"}
          type="password" placeholder="Confirm Password" required 
          value={newpassword}
      onChange={(e)=>setNewpassword(e.target.value)}/>
          <br/>

        </form>
         <div className='reset_button'>
            <Button type="submit" variant="contained" color="primary"
            onClick={handleNewpaasword}
            >
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

export default Reset