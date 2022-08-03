import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate,Link } from "react-router-dom";
import Copyright from './Copyright';
import GoogleIcon from '@mui/icons-material/Google';
import { Alert,Collapse,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import {
  auth,
  loginDenganEmailDanPassword,
  loginDenganGoogle
} from "../authentication/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const [errorCheck,setError] = useState("");
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState("");

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const textFieldEmailOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      email: event.target.value,
    });
  };

  const textFieldPasswordOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      password: event.target.value,
    });
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    let cek = await loginDenganEmailDanPassword(credential.email, credential.password);
    if(cek==="auth/invalid-email"){
      setError("Invalid Email");
      setOpen(true);
      setColor("warning");
    }
    else if(cek==="auth/internal-error") {
      setError("Internal Error");
      setOpen(true);
      setColor("error");
    }
    else if(cek==="auth/user-not-found") {
      setError("Akun Belum Terdaftar! Silakan Mendaftar");
      setOpen(true);
      setColor("warning");
    }
    else if(cek==="auth/wrong-password") {
      setError("Password Salah");
      setOpen(true);
      setColor("warning");
    }
  };

  useEffect(
    () => {
      if (loading) {
        return;
      }
      if (error) {
        console.log("error nih",error);
      }
      if (user) {
        navigate("/");
      }
    },
    [user, loading, navigate, error]
  );
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5298bac0-b8bf-4c80-af67-725c1272dbb0/ddw5a57-cca3e843-47ff-4154-9817-f4752d208e42.jpg/v1/fill/w_1192,h_670,q_70,strp/final_fantasy_vii_remake_wallpaper_by_thekingblader995_ddw5a57-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDgwIiwicGF0aCI6IlwvZlwvNTI5OGJhYzAtYjhiZi00YzgwLWFmNjctNzI1YzEyNzJkYmIwXC9kZHc1YTU3LWNjYTNlODQzLTQ3ZmYtNDE1NC05ODE3LWY0NzUyZDIwOGU0Mi5qcGciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.lLuZKbu4MaeS7ZiXOUwjU992aJlMVSRWxE07MneAbJo)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {
            errorCheck!==""?(<Collapse in={open} timeout={"auto"}>
            <Alert action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}> <CloseIcon fontSize="inherit" />
                  </IconButton>} severity={color} sx={{marginTop:"1em"}}>{errorCheck}</Alert></Collapse>):null
          }
            <Box component="form" noValidate onSubmit={(event)=>loginHandler(event)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={credential.email}
                onChange={textFieldEmailOnChangeHandler}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credential.password}
                onChange={textFieldPasswordOnChangeHandler}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={"/forgot"} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/register"} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Button variant="outlined" sx={{ mt: 3, mb: 2 }} fullWidth onClick={loginDenganGoogle}><GoogleIcon style={{marginRight:"0.3em"}} />Login With Google</Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}