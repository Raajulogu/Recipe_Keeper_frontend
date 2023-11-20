import React, { useEffect, useState } from 'react'
import "./Base.css";
import { Box, Button, Drawer, FormControlLabel, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GradeIcon from '@mui/icons-material/Grade';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const Base = ({children,theme,setTheme}) => {
    const navigate = useNavigate();
    let [bodyColor,setBodyColor]=useState("rgb(248, 243, 230)");
    let [headColor,setHeadColor]=useState("white");
    let [fontColor,setFontColor]=useState("black");

    useEffect(()=>{
      handleColor()
    }, [theme])
    //Logout function
    function handleLogut(){
        localStorage.removeItem("token")
        navigate("/")
    };
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      
      //Handle colors
      async function handleColor(){
        if(theme===true){
            setBodyColor("rgb(59, 58, 58)");
            setHeadColor("black");
            setFontColor("white");
        }
        else{
            setBodyColor("rgb(248, 243, 230)");
            setHeadColor("white");
            setFontColor("black");
        }
      }
      async function handlecolorClick(){
        setTheme(!theme)
      }
      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,height:"100%" }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
          style={{ backgroundColor: `${bodyColor}`, color:`${fontColor}` }}
        >
          <List>
              <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate("/")}>
                  <ListItemIcon>
                    <HomeIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Home"/>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate("/my-recipe")}>
                  <ListItemIcon>
                    <AccountCircleIcon/>
                  </ListItemIcon>
                  <ListItemText primary="My Recipes"/>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate("/favourites")}>
                  <ListItemIcon>
                    <GradeIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Favourites"/>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate("/addrecipe")}>
                  <ListItemIcon>
                    <AddToHomeScreenIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Post Recipe"/>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DarkModeIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Dark theme"/>
                  <FormControlLabel
                    sx={{
                      display: 'block',
                    }}
                    control={
                      <Switch
                        checked={theme}
                        onChange={() => handlecolorClick()}
                        name="theme"
                        color="primary"
                      />
                    }
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={()=>handleLogut()}>
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Logout"/>
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      );
  return (
    <div className='container-fluid main-head'
      style={{ backgroundColor: `${bodyColor}`, color:`black` }}> 
        <header className='nav-container row'
        style={{ backgroundColor: `${headColor}`}}
        >
            <nav>
                <div className='nav-box'>
                  <div className='image-container'>
                      <img id='logo' src='data:image/png;base64,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'
                       alt='Recipe Keeper'/>
                       <h4 className='app-name'
                       style={{ color:`${fontColor}` }}
                       >Recipe Keeper</h4>
                  </div>
                  <div className='navs'>
                    {!localStorage.getItem('token')&&
                    (
                        <span>
                            <IconButton 
                            edge="end" 
                            color="inherit" 
                            aria-label="add students" 
                            onClick={()=>navigate("/login")}
                            sx={{ mr: 2 }}>  
                            Login
                            </IconButton>

                            <IconButton 
                            edge="end" 
                            color="inherit" 
                            aria-label="add students" 
                            onClick={()=>navigate("/signup")}
                            sx={{ mr: 2 }}>  
                            Signup
                            </IconButton>
                        </span>
                    )
                    }
                    {localStorage.getItem("token") &&
                        <React.Fragment key={"right"}>
                            <Button onClick={toggleDrawer("right", true)}><MenuIcon/></Button>
                            <Drawer
                                anchor={"right"}
                                open={state["right"]}
                                onClose={toggleDrawer("right", false)}
                            >
                                {list("right")}
                            </Drawer>
                        </React.Fragment>
                    }
                  </div>
                </div>
            </nav>
        </header>
        <main>
            <div className='contents'>
                {children}
            </div>
        </main>
        
    </div>
  )
}

export default Base