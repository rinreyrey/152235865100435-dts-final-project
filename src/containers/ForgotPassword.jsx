import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate,Link } from "react-router-dom";
import {
  auth,
  resetPassword,
} from "../authentication/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert,Collapse,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to={"/"}>
        Movies
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);

  const [errorCheck,setError] = useState("");
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState("");
  
  const [credential, setCredential] = useState({
    email: "",
  });

  const textFieldEmailOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      email: event.target.value,
    });
  };

  const resetHandler = async (event) => {
    event.preventDefault();
    let cek = await resetPassword(credential.email);
    if (cek==="terkirim") {
      setError("Silakan Cek Email Anda!");
      setOpen(true);
      setColor("success");
    }
    else if (cek==="auth/missing-email"){
      setError("Silakan Isi Email Anda!");
      setOpen(true);
      setColor("info");
    }
    else if (cek==="auth/user-not-found"){
      setError("User Tidak Ditemukan! Silakan Mendaftar");
      setOpen(true);
      setColor("warning");
    }
  };

  // Kita gunakan.... useEffect !
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
            Forgot Password
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
          <Box component="form" noValidate onSubmit={resetHandler} sx={{ mt: 3,width: '100%' }}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/login"} variant="body2">
                  Remember your password? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}