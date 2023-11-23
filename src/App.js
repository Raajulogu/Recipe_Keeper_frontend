import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import MyRecipe from "./Components/MyRecipe";
import Favourites from "./Components/Favourites";
import AddRecipe from "./Components/AddRecipe";
import Recipe from "./Components/Recipe";
import { useState } from "react";
import EditRecipe from "./Components/EditRecipe";
import ResetPassword from "./Components/ResetPassword";

function App() {
  let [data, setData] = useState([]);
  let [ind, setInd] = useState(0);
  let [recipes, setRecipes] = useState([]);
  let [theme, setTheme] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Dashboard
              data={data}
              setData={setData}
              ind={ind}
              setInd={setInd}
              recipes={recipes}
              setRecipes={setRecipes}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route
          path="/my-recipe"
          element={
            <MyRecipe
              data={data}
              setData={setData}
              ind={ind}
              setInd={setInd}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              data={data}
              setData={setData}
              ind={ind}
              setInd={setInd}
              recipes={recipes}
              setRecipes={setRecipes}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />
        <Route
          path="/addrecipe"
          element={<AddRecipe theme={theme} setTheme={setTheme} />}
        />
        <Route
          path="/recipe"
          element={
            <Recipe
              data={data}
              setData={setData}
              ind={ind}
              setInd={setInd}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />
        <Route
          path="/editrecipe"
          element={
            <EditRecipe
              data={data}
              setData={setData}
              ind={ind}
              setInd={setInd}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
