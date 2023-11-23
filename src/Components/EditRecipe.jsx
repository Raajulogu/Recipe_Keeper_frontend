import React, { useState } from "react";
import "./EditRecipe.css";
import { useNavigate } from "react-router-dom";
import Base from "../Base/Base";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditRecipe = ({ data, setData, ind, setInd, theme, setTheme }) => {
  let navigate = useNavigate();
  let [title, setTitle] = useState(data[ind].recipename);
  let [ingredients, setIngredients] = useState(data[ind].ingredients.join(","));
  let [instructions, setInstructions] = useState(data[ind].instructions);
  let [cookingtime, setCookingtime] = useState(data[ind].cookingtime);
  let [image, setImage] = useState(data[ind].image);
  let [type, setType] = useState(data[ind].type);
  let [tag, setTag] = useState(data[ind].tags.join(","));
  let [error, setError] = useState("");
  let email = localStorage.getItem("email");
  if (!localStorage.getItem("token")) {
    navigate("/login", { replace: true });
  }
  const [sucessMsg, setSucessMessage] = useState("");
  let token = localStorage.getItem("token");

  //Edit a Recipe
  async function EditRecipe() {
    let ingrediantaData = ingredients.split(",");
    let tags = tag.split(",");
    const val = {
      recipename: title,
      ingredients: ingrediantaData,
      instructions: instructions,
      cookingtime: cookingtime,
      image: image,
      type: type,
      tags: tags,
      user: email,
    };
    let res = await fetch(
      `https://recipe-keeper-backend.vercel.app/api/recipe/editrecipe`,
      {
        method: "PUT",
        body: JSON.stringify({ rec: val, id: data[ind]._id }),
        headers: {
          "Content-Type": "application/json",
          "x-auth": token,
        },
      }
    );

    let temp = await res.json();
    if (!temp.data) {
      setError(temp.message);
      setSucessMessage("");
    } else {
      navigate("/");
    }
    setSucessMessage(temp.message);
  }
  return (
    <Base theme={theme} setTheme={setTheme}>
      <div className="input-container row">
        <div className="back-arrow" onClick={() => navigate("/")}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="input-box">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter Recipe Nmae"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <TextField
            label="ingrediants"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter ingrediants by comma sepparated"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            type="text"
          />
          <TextField
            label="instructions"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Give an Instructions how to cook "
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <TextField
            label="cookingtime"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="How many minutes it will take"
            type="number"
            value={cookingtime}
            onChange={(e) => setCookingtime(e.target.value)}
          />
          <TextField
            label="image"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter image Url for the Recipe"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            label="type"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Enter the type of the dish"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            label="tags"
            variant="outlined"
            fullWidth
            sx={{ m: 1 }}
            placeholder="Give a tags by comma separate "
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={() => EditRecipe()}
          >
            Post
          </Button>
          {error ? <Typography color={"danger"}>{error}</Typography> : ""}
        </div>
      </div>
    </Base>
  );
};

export default EditRecipe;
