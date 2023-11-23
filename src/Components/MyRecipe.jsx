import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Rating, Snackbar } from "@mui/material";
import "./MyRecipe.css";

const MyRecipe = ({ ind, setInd, theme, setTheme }) => {
  let navigate = useNavigate();
  let [rec, setRec] = useState([]);
  let [fontColor, setFontColor] = useState("black");
  let [data, setData] = useState([]);
  if (!localStorage.getItem("token")) {
    navigate("/login", { replace: true });
  }
  useEffect(() => {
    let email = localStorage.getItem("email");

    async function fetchAllData() {
      let token = localStorage.getItem("token");
      let res = await fetch(
        `https://recipe-keeper-backend.vercel.app/api/recipe/user-recipes`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
            "x-auth": token,
          },
        }
      );
      let value = await res.json();
      setData(value.data);
    }
    fetchAllData();
    let val = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].user === email) {
        val.push(data[i]);
      }
    }
    setRec(val);
    if (theme === true) {
      setFontColor("white");
    } else {
      setFontColor("black");
    }
  }, []);
  //Run after Recipe Deleted
  useEffect(() => {
    let email = localStorage.getItem("email");
    let val = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].user === email) {
        val.push(data[i]);
      }
    }
    setRec(val);
    if (theme === true) {
      setFontColor("white");
    } else {
      setFontColor("black");
    }
  }, [data]);

  useEffect(() => {
    if (theme === true) {
      setFontColor("white");
    } else {
      setFontColor("black");
    }
  }, [theme]);

  //Handle Rating
  async function handleRating({ newValue, id }) {
    let token = localStorage.getItem("token");
    let data = {
      rating: newValue,
      id: id,
    };
    console.log(data.rating);
    let res = await fetch(
      `https://recipe-keeper-backend.vercel.app/api/recipe/ratings`,
      {
        method: "PUT",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json",
          "x-auth": token,
        },
      }
    );
    await res.json();
  }
  //handle Recipe
  async function handleRecipe(index) {
    setInd(index);
    navigate("/recipe");
  }

  //handle delete Recipe
  async function handleDeleteRecipe({ id }) {
    let response = await fetch(
      `https://recipe-keeper-backend.vercel.app/api/recipe/delete-recipe/${id}`,
      {
        method: "DELETE",
      }
    );
    let val = await response.json();
    if (val) {
      let remainingdata = data.filter((prod, index) => prod._id !== id);
      setData(remainingdata);
    }
    handleClick();
  }
  //Handle Edit Recipe
  async function handleEditRecipe(index) {
    setInd(index);
    navigate("/editrecipe");
  }

  //Snackbar
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Base theme={theme} setTheme={setTheme}>
      <div className="my-rec-container">
        <div style={{ color: `${fontColor}` }}>
          <h2>Your Recipes</h2>
        </div>
        <div>
          {rec.length > 1 ? (
            <div class="cards-container row">
              {rec.map((foo, index) => (
                <div key={index} className="cards col-md-3">
                  <div class="card">
                    <img
                      src={foo.image}
                      class="card-img-top"
                      alt="..."
                      onClick={() => handleRecipe(index)}
                    />
                    <div class="card-body">
                      <h5 class="card-title">
                        <h4>{foo.recipename}</h4>
                      </h5>
                      <br />
                      <Rating
                        name="simple-controlled"
                        value={foo.rating[0]}
                        onChange={(event, newValue) => {
                          handleRating({ newValue: newValue, id: foo._id });
                        }}
                      />
                      <div className="my-btns">
                        <Button
                          variant="contained"
                          onClick={() => handleEditRecipe(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteRecipe({ id: foo._id })}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              `{" "}
            </div>
          ) : (
            <p>No data found</p>
          )}
        </div>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Recipe Deleted Successfully
          </Alert>
        </Snackbar>
      </div>
    </Base>
  );
};

export default MyRecipe;
