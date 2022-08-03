import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert,Collapse,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate,Link } from "react-router-dom";
import {
  auth,
  registerDenganEmailDanPassword,
  loginDenganGoogle
} from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Copyright from "./Copyright";
import GoogleIcon from '@mui/icons-material/Google';

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);

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

  const registerHandler = async (event) => {
    event.preventDefault();
    let cek = await registerDenganEmailDanPassword(credential.email, credential.password);
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
    else if(cek==="auth/weak-password") {
      setError("Password harus punya minimal 6 karakter!");
      setOpen(true);
      setColor("warning");
    }
    else if(cek==="auth/email-already-in-use") {
      setError("Email sudah pernah dipakai! Silakan login");
      setOpen(true);
      setColor("warning");
    }
  };

  useEffect(
    () => {
      if (isLoading) {
        return;
      }
      if (user) {
        navigate("/");
      }
    },
    [user, isLoading, navigate]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {
            errorCheck!==""?(<Collapse in={open}>
            <Alert action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}> <CloseIcon fontSize="inherit" />
                  </IconButton>} severity={color} sx={{marginTop:"0.5em"}}>{errorCheck}</Alert></Collapse>):null
          }
          <Box component="form" noValidate onSubmit={(event)=>registerHandler(event)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={credential.email}
                onChange={textFieldEmailOnChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={credential.password}
                onChange={textFieldPasswordOnChangeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Button variant="outlined" sx={{ mt: 3, mb: 2 }} fullWidth onClick={loginDenganGoogle}><GoogleIcon style={{marginRight:"0.3em"}} />Login With Google</Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}