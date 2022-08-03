import React,{useState,useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import {Button, Link} from '@mui/material';
import {Link as Lin} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logom from '../assets/logom.svg';
import GiftBox from '../assets/GiftBox.svg';
import ProfilePicture1 from '../assets/ProfilePicture1.svg';
import GiftBoxBlack from '../assets/GiftBoxBlack.svg';
import ComboBox from './ComboBox';
import { useNavigate } from "react-router-dom";
import { keluarDariApps } from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginIcon from '@mui/icons-material/Login';
import {
  auth
} from "../authentication/firebase";

export default function PrimarySearchAppBar({email}) {
    const navigate = useNavigate();
    let {pathname} = useLocation();
    const [user,isLoading] = useAuthState(auth);
    
  const buttonLogoutOnClickHandler = async () => {
    await keluarDariApps();
    navigate("/");
  };

  // const buttonChooseProfile = () => {
  //   navigate("/profile");
  // };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const loginHandler = () => {
    navigate("/login");
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={buttonLogoutOnClickHandler}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user?<MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <img src={GiftBoxBlack} alt="giftbox"/>
        </IconButton>
        <p>Gift</p>
      </MenuItem>:null}
      {user?<MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
            <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>:null}
      {user?<MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>:null}
      {!user?<MenuItem>
        <IconButton
          size="large"
          aria-label="Login"
          color="inherit"
        >
            <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>:null}
    </Menu>
  );

  useEffect(
    () => {
      if (isLoading) {
        return;
      }
      if (!user) {
        navigate("/");
      }
    },
    [user, navigate, isLoading]
  );
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Lin to={'/'} style={{textDecoration:"none"}}><Typography variant='h5' style={{color:"white"}}>GAMES</Typography></Lin>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} id="navlink">
            <Lin to='/' className='navlink-item'><HomeIcon />Home</Lin>
            <Lin to='/browse' className='navlink-item'><ManageSearchIcon />Browse</Lin>
          </Box>
          <ComboBox />
          
          {user?(<Box sx={{ display: { xs: 'none', md: 'flex' },alignItems:'center' }}>
            <IconButton size="large" aria-label="show 4 new mails" sx={{marginLeft:"10px"}} color="inherit">
                <img src={GiftBox} alt="giftbox"/>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                <NotificationsIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <img src={ProfilePicture1} alt="Profile" style={{width:"24px",height:"24px"}}></img>
              <Typography variant='body2' style={{marginLeft:'7px'}}>{email}</Typography>
            </IconButton>
          </Box>):(<Box sx={{ display: { xs: 'none', md: 'flex' },alignItems:'center',marginLeft:"1em" }}><Button variant="contained" size="large" style={{backgroundColor:"#d27519"}} onClick={loginHandler}><LoginIcon style={{marginRight:"5px"}}/>Login</Button></Box>)}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {user?renderMenu:null}
    </Box>
  );
}
