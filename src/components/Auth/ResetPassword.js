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
import Swal from 'sweetalert2'

const supabaseUrl = 'https://hbvzbmargzwrfctmqqtd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhidnpibWFyZ3p3cmZjdG1xcXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MjYyOTksImV4cCI6MjAyODAwMjI5OX0.6cUMpEa6jksCGMNbgw3vaz-4KkkduiqDWZEgPr0-8Ys"
const supabase = createClient(supabaseUrl, supabaseKey)

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://fullgospel.com/">
//         Full Gospel
//       </Link>{'-'}
//       <Link color="inherit" href="https://cyaneltechnologies.com/">
//         Powered by Cyanel Technologies
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const mail = localStorage.getItem('mail')

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);


  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
  }, [password])



  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validPwd) {
      const { data, error } = await supabase
      .from('customers')
      .update({ password: password })
      .eq('email', mail)
      .select()
  
      if(error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Update Failed",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/signin')
      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Update Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/signin')
      }
    }else {
      setErrMsg("Enter valid password")
    }

        
    
    // const { data, error } = await supabase.auth
    //   .updateUser({ password: newPassword })

    // console.log(error)

    // if (data) alert("Password updated successfully!")
    // if (error) alert("There was an error updating your password.")
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
                <Box sx={{ mt: 1 }}>
                { errMsg ? 
                <Alert variant="filled" severity="error" sx={{ width: '100%', marginBottom: 2 }}>
                    {errMsg}
                </Alert> :
                ""          
                }
                <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validPwd ? "form-control is-valid" : "form-control" && !password ? "form-control": "form-control is-invalid"}
                    type='text'
                    required 
                    placeholder="Password"
                    onChange={(e) => { 
                        setPassword(e.target.value)
                    }}
                    onFocus = {()=> setPwdFocus(true)}
                    onBlur = {()=> setPwdFocus(false)}
                    id="floatingInput" 
                    value={password}
                  />
                  <label for="floatingInput">Password</label>
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions": "offscreen"}>
                    <i class="ti-info-alt" style={{margin: '5px'}}></i>
                      8 to 24 characters.<br/>
                    Must include uppercase and lowercase letters,<br/>
                    a number and a special character.<br/>
                    Allowed special characters: ! @ # $ %
                  </p>
                </div>
              </Grid>
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
