import React, { useState } from 'react';
import Base from '../Base/Base';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./AddRecipe.css"

const AddRecipe = ({theme,setTheme}) => {

    let navigate = useNavigate();
    let [title,setTitle]=useState("");
    let [ingredients,setIngredients]=useState("");
    let [instructions, setInstructions] = useState("");
    let [cookingtime,setCookingtime]=useState("");
    let [image, setImage] = useState("");
    let [type, setType] = useState("");
    let [tag, setTag] = useState("");
    let [error, setError] = useState("");
    let email=localStorage.getItem('email')

    const [sucessMsg, setSucessMessage] = useState("")
    let token=localStorage.getItem("token")
    
    //Post a New Recipe in server
    async function postNewRecipe(){
      let ingrediantaData=ingredients.split(",")
      let tags=tag.split(",");
        const newQues = {
            recipename:title,
            ingredients:ingrediantaData,
            instructions:instructions,
            cookingtime:cookingtime,
            image:image,
            type:type,
            tags:tags,
            user:email
        }
          const res = await fetch(`https://recipe-keeper-backend.vercel.app/api/recipe/post-recipe`, {
            method:"POST",
            body:JSON.stringify(newQues),
            headers: {
                "Content-Type":"application/json",
                "x-auth": token,
            }
        });

        const data = await res.json();
       if(!data.data){
          setError(data.message)
          setSucessMessage("")
       }
       else{
        navigate("/")
       }
       setSucessMessage(data.message)
        
        
       
    }
  return (
    <Base 
    theme={theme}
    setTheme={setTheme}
    >
        <div className='input-container row'>
        <div className='back-arrow'
            onClick={()=>navigate("/")}
            >
                <IconButton>
                    <ArrowBackIcon/>
                </IconButton>
            </div>
            <div className='input-box'>
            <TextField label="Title" variant="outlined" fullWidth sx={{ m: 1 }}
            placeholder="Enter Recipe Nmae"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            type="text"
            />
            <TextField label="ingrediants" variant="outlined" fullWidth sx={{ m: 1 }}
            placeholder="Enter ingrediants by comma sepparated"
            value={ingredients}
            onChange={(e)=>setIngredients(e.target.value)}
            type="text"
            />
            <TextField label="instructions" variant="outlined" fullWidth sx={{ m: 1 }}
            placeholder="Give an Instructions how to cook "
            type="text"
            value={instructions}
            onChange={(e)=>setInstructions(e.target.value)}
            />
            <TextField label="cookingtime" variant="outlined" fullWidth sx={{ m: 1 }}
            placeholder="How many minutes it will take"
            type="number"
            value={cookingtime}
            onChange={(e)=>setCookingtime(e.target.value)}
            />
            <TextField label="image" variant="outlined" fullWidth sx={{ m: 1 }}
            placeholder="Enter image Url for the Recipe"
            type="text"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            />
            <TextField label="type" variant="outlined" fullWidth sx={{ m: 1 }}
            placeholder="Enter the type of the dish"
            type="text"
            value={type}
            onChange={(e)=>setType(e.target.value)}
            />
            <TextField label="tags" variant="outlined" fullWidth sx={{ m: 1 }}
            placeholder="Give a tags by comma separate "
            type="text"
            value={tag}
            onChange={(e)=>setTag(e.target.value)}
            />
            <Button
            type="submit"
            variant ="contained"
            onClick={()=>postNewRecipe()}
            >Post</Button>
    {error? 
            <Typography color={"danger"}>
            {error}
            </Typography> : "" }
            </div>
        </div>
    </Base>
  )
}

export default AddRecipe