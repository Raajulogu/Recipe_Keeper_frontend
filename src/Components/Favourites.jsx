import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';

const Favourites = ({data,setData,ind,setInd,theme,setTheme}) => {
  let navigate = useNavigate();
  let [value, setValue] =  useState(0);
  let [error, setError] = useState("");
  let [recipes,setRecipes] = useState([]);
  let [fontColor,setFontColor]=useState("black");

  //Getting data
  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate("/login", {replace:true})
    }
    let email = localStorage.getItem("email")
    let token = localStorage.getItem("token");
    const fetchAllData = async()=>{
      let res=await fetch(`https://recipe-keeper-backend.vercel.app/api/user/get-favourites`,{
        method:"PUT",
        body:JSON.stringify({email}),
        headers:{
          "Content-Type":"application/json",
          "x-auth":token
        }
      });
     let val = await res.json()
      if(!val.data) {
      setError(data.message);
      }
      else{
        let temp=[];
        for(var i=0;i<data.length;i++){
          if(val.data.includes(data[i]._id)){
            temp.push(data[i])
          }
        }
        setRecipes(temp);
      }
      }
    fetchAllData()
    if(theme===true){
      setFontColor("white");
    }
    else{
        setFontColor("black");
    }
  
    }, [])

    useEffect(()=>{
      if(theme===true){
        setFontColor("white");
      }
      else{
          setFontColor("black");
      }
    }, [theme])

  
  //Handle Rating
  async function handleRating({newValue,id}){
    let token = localStorage.getItem('token');
    let data={
      rating:newValue,
      id:id
    }
    let res=await fetch(`https://recipe-keeper-backend.vercel.app/api/recipe/ratings`,{
    method:"PUT",
    body:JSON.stringify({data}),
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
    setValue(val.data.rating);
  }
  }
  //handle Recipe
  async function handleRecipe(index){
    setInd(index);
    navigate('/recipe')
  }
  return (
    <Base 
    theme={theme}
    setTheme={setTheme}
    >
        <div className='my-rec-container'>
          <div
          style={{ color:`${fontColor}` }}
          >
          <h2>Your Favourites</h2>
          </div>
        <div>
          {recipes.length>1 ?
            <div class="cards-container row">
              {recipes.map((foo,index)=>(
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
                    value={foo.rating[0]}
                    onChange={(event, newValue) => {
                      handleRating({newValue:newValue,id:foo._id});
                    }}
                  />
                </div>
              </div>
                </div>
              ))}
          ` </div>:<p>No data found</p>
            }
          </div>
        </div>
    </Base>
  )
}

export default Favourites