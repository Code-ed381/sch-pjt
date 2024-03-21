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
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import useAuth from '../Hook/useAuth';
import Alert from '@mui/material/Alert';

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

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event == "PASSWORD_RECOVERY") {
          const { data, error } = await supabase.auth
            .updateUser({ password: newPassword })
   
          if (data) alert("Password updated successfully!")
          if (error) alert("There was an error updating your password.")

          navigate('/login')
        }
    })

  };

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
                <LockResetIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Reset Password
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
                    onChange={(e)=> setNewPassword(e.target.value)}
                    required
                    fullWidth
                    id="email"
                    label="New Password"
                    name="newPassword"
                    autoFocus
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit} 
                >
                    Reset Password
                </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
  );
}