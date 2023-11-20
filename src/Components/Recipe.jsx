import React, { useEffect,useState } from 'react';
import "./Recipe.css";
import Base from '../Base/Base';
import { Alert, Button, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Recipe = ({data,setData,ind,setInd,theme,setTheme}) => {
    let [comment,setComment]=useState('');
    let [error, setError] = useState("");
    let [fontColor,setFontColor]=useState("black");
    let navigate=useNavigate()


    useEffect(()=>{
      
      if(theme===true){
        setFontColor("white");
      }
      else{
          setFontColor("black");
      }
    
      }, [])
    //Function for handle comment
    async function handleComment(){
        let token = localStorage.getItem('token');
        let res=await fetch(`https://recipe-keeper-backend.vercel.app/api/recipe/comment/${data[ind]._id}`,{
        method:"PUT",
        body:JSON.stringify({comment}),
        headers:{
          "Content-Type":"application/json",
          "x-auth":token
        }
      });
      let val = await res.json()
      if(!val.data) {
          setError(val.message)
      }
      else{
        setComment("")
      }
      handleClick()
      }

      //Snackbar
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Base 
    theme={theme}
    setTheme={setTheme}
    >
        <div className='recipe-container'
        style={{ color:`${fontColor}` }}
        >
            <div className='back-arrow'
            onClick={()=>navigate("/")}
            >
                <IconButton>
                    <ArrowBackIcon/>
                </IconButton>
            </div>
           <div className='recipe-head'>
           <img id='recipe-full-img' src={data[ind].image} alt=""/>
           <h1>{data[ind].recipename}</h1>
           </div>
            <div className='recipe-body'>
            <h4><u>Description:</u></h4>
            <br/>
            <h4>Cooking Time:</h4>
            <p>{data[ind].cookingtime} minutes</p>
            <h4>Ingredients:</h4>
            <ul>
            {data[ind].ingredients.length && data[ind].ingredients.map((rec,index)=>(
                <li key={index}>{rec}</li>
            ))}
            </ul>
            <h4>Instructions:</h4>
            <p className='recipe-intsrut'>&emsp; &emsp; {data[ind].instructions}</p>
            </div>
            <br/>
            <div className='comment-container'>
                <TextField label="comment" variant="outlined" fullWidth sx={{ m: 1 }}
                placeholder="Leave you comment here..."
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                type="text"
                InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SendIcon/>
                        </IconButton>
                      </InputAdornment>
                      )
                    }}
                />
                {error? 
                <Typography color={"crimson"}>
                {error}
                </Typography> : "" }
                <Button onClick={()=>handleComment()}
                variant='contained'
                >Post &ensp;<SendIcon/></Button>
            </div>
            <div className='comments'>
                <h3>Comments:</h3>
                {data[ind].comments.length ? data[ind].comments.map((com,index)=>(
                    <div className='comment-box'>
                        <span><AccountCircleIcon/>&emsp;&emsp;
                        {com}</span>
                    </div>
                )):<p className='comment-box'>No comments</p>}
            </div>
            <Snackbar open={open} autoHideDuration={4000} 
                  onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" 
                  sx={{ width: '100%' }}>
                    Comment posted Successfully
                  </Alert>
                </Snackbar>
        </div>
    </Base>
  )
}

export default Recipe