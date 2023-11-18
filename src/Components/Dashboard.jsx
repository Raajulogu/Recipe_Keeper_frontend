import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import "./Dashboard.css";
import {  Button, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const Dashboard = ({data,setData,ind,setInd,recipes,setRecipes}) => {
    let [recipe, setRecipe] = useState([]);
    let [error, setError] = useState("");
    let [tokenId, setTokenId]= useState("");
    let [finder,setFinder]=useState("");
    let [value, setValue] =  useState(0);
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
     setRecipe(data.data);
     setValue(recipe.rating);
     setData(data.data);
    //  let temp=[];
    //  let temprec=[];
    //  for(let i=0; i<data.data.length; i++){
    //   if(!temp.includes(data.data[i].type)){
    //     temp.push(data.data[i].type);
    //     temprec.push([]);
    //   }
    //   temprec[temp.indexOf(data.data[i].type)].push(data.data[i])
    //  }
    //  console.log("data",temp,temprec);
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
            <div class="cards-container row">
            {finder.length<0?
              recipe.map((foo,index)=>(
                  <div key={index} className='cards col-md-3' >
                  <div class="card">
                  <img src={foo.image} class="card-img-top" alt="..."
                  onClick={()=>handleRecipe(index)}
                  />
                  <div class="card-body">
                    <h5 class="card-title"><h4>{foo.recipename}</h4></h5>
                    <br/>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        handleRating({newValue:newValue,id:foo._id});
                      }}
                    />
                    <Button variant='contained'
                    onClick={()=>handleFavourite({id:foo._id})}
                    >Add to Favourites</Button>
                  </div>
                </div>
                  </div>
              )):
              recipe.map((foo,index)=>(
                foo.recipename.toLowerCase().includes(finder.toLocaleLowerCase())
                ||foo.type.toLowerCase().includes(finder.toLocaleLowerCase())
                ||foo.tags.includes(finder.toLocaleLowerCase())
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
                      value={value}
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
                
            ))}
        </div>
            }
          </div>
        </div>
    </Base>
  )
}

export default Dashboard