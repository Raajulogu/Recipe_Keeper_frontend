import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import "./Dashboard.css";
import {  Button, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = ({data,setData,ind,setInd,recipes,setRecipes}) => {
    let [recipe, setRecipe] = useState([]);
    let [error, setError] = useState("");
    let [tokenId, setTokenId]= useState("");
    let [finder,setFinder]=useState("");
    let [value, setValue] =  useState(0);
    let [rectitle,setRectitle]=useState([]);
    let [recContent,setRecContent]=useState([]);
    let navigate = useNavigate();
    
    

  //Getting data
  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate("/login", {replace:true})
    }
    let token = localStorage.getItem("token")
    setTokenId(token)
    const fetchAllData = async()=>{
     const res = await fetch(`https://recipe-keeper-backend.vercel.app/api/recipe/get-all`, {
        method:"GET",
        headers:{
            "x-auth" : token
        }
     });
     const data = await res.json()
        if(!data.data) {
        setError(data.message);
        
     }
     setRecipe(data.data.data);
     setData(data.data.data);  
     setRectitle(data.data.temp)
     setRecContent(data.data.temprec)
    }
    fetchAllData()
    
  
    }, [])

    //Function for handle ratings
    async function handleRating({newValue,id}){
      let data={
        rating:newValue,
        id:id
      }
      
      let res=await fetch(`https://recipe-keeper-backend.vercel.app/api/recipe/ratings`,{
      method:"PUT",
      body:JSON.stringify({data}),
      headers:{
        "Content-Type":"application/json",
        "x-auth":tokenId
      }
    });
    let val = await res.json()
    if(!val.data) {
        setError(val.message)
    }
    else{
      setValue(val.data.rating);
    }
    }
    //handle Recipe
    async function handleRecipe(index){
      setInd(index);
      navigate('/recipe')
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

    //handle favourites
    async function handleFavourite({id}){
      let email=localStorage.getItem('email');
      let val={
        id,
        email
      }
      let res=await fetch(`https://recipe-keeper-backend.vercel.app/api/user/favourite`,{
        method:"PUT",
        body:JSON.stringify({val}),
        headers:{
          "Content-Type":"application/json",
          "x-auth":tokenId
        }
      });
      val=await res.json();
      handleClick()
      if(!val.data) {
      setError(val.message)
      }
      
    }

   

  return ( 
    <Base>
        <div className='home-container'>
          <div className='search-container'>
            <TextField
              className='search-field'
              label="Search"
              value={finder}
              onChange={e=>setFinder(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                  )
                }}
            />
          </div>
          <div className='title-pic'>
            <img src="https://img.freepik.com/free-photo/big-sandwich-hamburger-with-juicy-beef-burger-cheese-tomato-red-onion-wooden-table_2829-19631.jpg"
            id='title-pic' alt=""/>
          </div>
          <div>
          {recipe &&
            <div class="cards-container cards-container-1 row">
            {finder.length<=0?
              rectitle.map((foo,index)=>(
                  <div key={index} className='data-box'>
                    <div className='type-name'> 
                      <h1 className='type'><u>{foo[0].toUpperCase()+foo.slice(1)}</u></h1>
                    </div>
                    <br/>
                    <div className='rec-cards'>
                    {recContent[index].length && recContent[index].map((food,fooind)=>(
                      <Cards
                        key={index+fooind}
                        food={food}
                        foodind={fooind}
                        ind={ind}
                        setInd={setInd}
                      />
                    ))}
                    </div>
                  </div>
              )):
              <div className='sorted-card-container'>
                {
                  recipe.map((foo,index)=>(
                    foo.recipename.toLowerCase().includes(finder.toLocaleLowerCase())
                    ||foo.type.toLowerCase().includes(finder.toLocaleLowerCase())
                    ||foo.tags.join(" ").toLowerCase().includes(finder.toLocaleLowerCase())
                    ?
                    (<div key={index} className='cards col-md-3' >
                    <div class="card">
                    <img src={foo.image} class="card-img-top" alt="..."
                      onClick={()=>handleRecipe(index)}
                    />
                    <div class="card-body">
                      <h5 class="card-title"><h4>{foo.recipename}</h4></h5>
                      <br/>
                      <Rating
                          name="simple-controlled"
                          value={foo.rating[0]}
                          onChange={(event, newValue) => {
                            handleRating({newValue,id:foo._id});
                          }}
                        />
                        <Button variant='contained'
                        onClick={()=>handleFavourite({id:foo._id})}
                        >Add to Favourites</Button>
                    </div>
                  </div>
                    </div>):""
                ))
                }
              </div>
            }
        </div>
            }
          </div>
          <div className='copyright'>
          <p><CopyrightIcon/> 2023 Rajeshkumar all rights reserved</p>
        </div>
        <Snackbar open={open} autoHideDuration={4000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" 
            sx={{ width: '100%' }}>
              Recipe added to Favourites
            </Alert>
          </Snackbar>
        </div>
    </Base>
  )
}

export default Dashboard


//Cards Component
const Cards = ({food,fooind,ind,setInd}) => {
  let [value, setValue] =  useState(0);
  let [error, setError] = useState("");
  let [tokenId, setTokenId]= useState("");
  let navigate = useNavigate();

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

  //Function for handle ratings
  async function handleRating({newValue,id}){
    let data={
      rating:newValue,
      id:id
    }
    let res=await fetch(`https://recipe-keeper-backend.vercel.app/api/recipe/ratings`,{
    method:"PUT",
    body:JSON.stringify({data}),
    headers:{
      "Content-Type":"application/json",
      "x-auth":tokenId
    }
  });
  let val = await res.json()
  if(!val.data) {
      setError(val.message)
  }
  else{
    setValue(val.data.rating);
  }
  }
  //handle Recipe
  async function handleRecipe(index){
    setInd(index);
    navigate('/recipe')
  }

  //handle favourites
  async function handleFavourite({id}){
    let email=localStorage.getItem('email');
    let val={
      id,
      email
    }
    let res=await fetch(`https://recipe-keeper-backend.vercel.app/api/user/favourite`,{
      method:"PUT",
      body:JSON.stringify({val}),
      headers:{
        "Content-Type":"application/json",
        "x-auth":tokenId
      }
    });
    handleClick();
    val=await res.json();
    if(!val.data) {
      setError(val.message)
  }
  }
  return(
      <div key={fooind} className='cards col-md-3' >
                  <div class="card">
                  <img src={food.image} class="card-img-top" alt="..."
                  onClick={()=>handleRecipe(fooind)}
                  />
                  <div class="card-body">
                    <h5 class="card-title"><h4>{food.recipename}</h4></h5>
                    <br/>
                    <Rating
                      name="simple-controlled"
                      value={Number(food.rating[0])}
                      onChange={(event, newValue) => {
                        handleRating({newValue:newValue,id:food._id});
                      }}
                    />
                    <Button variant='contained'
                    onClick={()=>handleFavourite({id:food._id})}
                    >Add to Favourites</Button>
                  </div>
                </div>
                <Snackbar open={open} autoHideDuration={4000} 
                  onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" 
                  sx={{ width: '100%' }}>
                    Recipe added to Favourites
                  </Alert>
                </Snackbar>
        </div>
  )
}