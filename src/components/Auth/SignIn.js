import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import useAuth from '../Hook/useAuth';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'

const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://fullgospel.com/">
        Full Gospel
      </Link>{'-'}
      <Link color="inherit" href="https://cyaneltechnologies.com/">
        Powered by Cyanel Technologies
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [gallery, setGallery] = useState([])
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const randomIndex = Math.floor(Math.random() * gallery?.length);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const {
      data: { user },
      error,
    } = await supabase
      .auth
      .signInWithPassword({ email, password })

    if(error) {
      setErrMsg(error.message)
    }
    else {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const { user } = session 

      setAuth(user)

      navigate('/feedback')

      console.log(session)
    }
  };

  const handleReset = async (e)=> {
    e.preventDefault();

    if (email === '') {
      setErrMsg('Please enter email address')
    }
    else{
      const { data, error } = await supabase.auth
      .resetPasswordForEmail(email, {redirectTo: 'http://localhost:3000/#/reset-password'})

      if (error) {
        setErrMsg(error.message)
      }
      else{
        Swal.fire({
          title: "Do you want to send recovery mail?",
          showCancelButton: true,
          confirmButtonText: "Send",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Sent!", "", "success");
          } 
        }).then(()=>{
          navigate('/reset-password')
        });
      }
    }
  }

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
                Sign in
                </Typography>
                { errMsg ? 
                <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                    {errMsg}
                </Alert> :
                ""          
                }
                <Box sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    onChange={(e)=> setPassword(e.target.value)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit} 
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link 
                      onClick={handleReset} 
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                    </Grid>
                    {/* <Grid item>
                    <Link href="#/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid> */}
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
  );
}
