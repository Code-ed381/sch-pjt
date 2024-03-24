import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useRef, useEffect } from "react";
import useAuth from '../Hook/useAuth';
import { useNavigate } from "react-router-dom"
import { createClient } from '@supabase/supabase-js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)

const USER_REGEX = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^(?:\+\d{12}|\d{10})$/;
// const PHONE_REGEX = /^\+(?:\d\s?){1,3}(?:\(\d{1,4}\)\s?|\d{1,4})(?:\d{1,4}\s?[-\/]?\s?){1,3}\d{1,4}$/;

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

export default function Register() {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();
  const [checked, setChecked] = useState(false)
  const [role, setRole] = useState('customer')

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const [fullname, setFullname] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [phone, setPhone] = useState(null);
  const [validPhone, setValidPhone] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(false);


  useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
      const result = USER_REGEX.test(fullname);
      setValidName(result)
  }, [fullname])

  useEffect(() => {
      const result = EMAIL_REGEX.test(email);
      setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = PHONE_REGEX.test(phone);
    setValidPhone(result)
}, [phone])

  useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('')
  }, [ fullname, pwd, matchPwd])

  const navigate = useNavigate() 
    
  const handleSubmit = async (e)=> {
      e.preventDefault()

      //Error messages for various errors
      const v1 = USER_REGEX.test(fullname);
      const v2 = PWD_REGEX.test(pwd);

      if (!v1 || !v2) {
          setErrMsg("Invalid Entry");
          return;
      }
      try {

        const { data, error } = await supabase
        .from('users')
        .insert([
          { 
            fullname: fullname, 
            email: email,
            phone: phone,
            password: pwd
          },
        ])
        .select()
                
        
        if(error) {
          throw new Error(error.message);
        }


        console.log(data)
        
        navigate('/admin/customers');
        
      }
      catch (err) {
        console.log(err)
        if (err?.res?.status === 409) {
          setErrMsg('Username already exists');
        }
        else {
          setErrMsg('Registration Failed')
        }
        errRef.current.focus(); 
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
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          { errMsg ? 
            <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
              {errMsg}
            </Alert> :
            ""          
          }
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    type="text" 
                    required
                    ref={userRef}
                    class={validName ? "form-control is-valid" : "form-control" && !fullname ? "form-control": "form-control is-invalid"}
                    id="floatingInput" 
                    placeholder="name@example.com"
                    autoComplete="off"
                    onChange={(e) => { 
                      setFullname(e.target.value)
                    }}
                    aria-invalid = {validName ? "false" : "true"}
                    aria-describedby = "uidnote"
                    onFocus = {()=> setUserFocus(true)}
                    onBlur = {()=> setUserFocus(false)}
                    value={fullname}
                  />
                  <label for="floatingInput">Full name</label>
                  <p id="uidnote" className={userFocus && fullname && !validName ? "instructions": "offscreen"}>
                    <i class="ti-info-alt" style={{margin: '5px'}}></i>
                    4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Must be 2 names.
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validEmail ? "form-control is-valid" : "form-control" && !email ? "form-control": "form-control is-invalid"}
                    type="text" 
                    required
                    placeholder = "Email"
                    autoComplete = "off" 
                    onChange={(e) => { 
                        setEmail(e.target.value)
                    }}
                    aria-invalid = {validEmail ? "false" : "true"}
                    aria-describedby = "emailnote"
                    id="floatingInput" 
                    value={email}
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validPhone ? "form-control is-valid" : "form-control" && !phone ? "form-control": "form-control is-invalid"}
                    type="phone" 
                    required
                    placeholder = "Phone"
                    autoComplete = "off" 
                    onChange={(e) => { 
                        setPhone(e.target.value)
                    }}
                    aria-invalid = {validPhone ? "false" : "true"}
                    aria-describedby = "emailnote"
                    id="floatingInput" 
                    value={phone}
                  />
                  <label for="floatingInput">Phone</label>
                  <p id="uidnote" className={userFocus && phone && !validPhone ? "instructions": "offscreen"}>
                    <i class="ti-info-alt" style={{margin: '5px'}}></i>
                    e.g. +233 23XXXXXXX<br/>
                    <br/>
                    
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validPwd ? "form-control is-valid" : "form-control" && !pwd ? "form-control": "form-control is-invalid"}
                    type="password" 
                    required 
                    placeholder="Password"
                    onChange={(e) => { 
                        setPwd(e.target.value)
                    }}
                    onFocus = {()=> setPwdFocus(true)}
                    onBlur = {()=> setPwdFocus(false)}
                    id="floatingInput" 
                    value={pwd}
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
              <Grid item xs={12}>
                <div class="form-floating">
                  <input 
                    class={validMatch && matchPwd ? "form-control is-valid" : "form-control" && (validMatch || !matchPwd) ? "form-control": "form-control is-invalid"}
                    type="password" 
                    required
                    placeholder="Confirm Password"
                    onChange={(e) => { 
                        setMatchPwd(e.target.value)
                    }}
                    onFocus = {()=> setMatchFocus(true)}
                    onBlur = {()=> setMatchFocus(false)}
                    id="floatingInput" 
                    value={matchPwd}
                  />
                  <label for="floatingInput">Retype password</label>
                  <p id="pwdnote" className={matchFocus && !validMatch ? "instructions": "offscreen"}>
                    <i class="ti-info-alt" style={{margin: '5px'}}></i>
                    Must match the password input field
                  </p>
                </div>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value='customer'>Customer</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                  </Select>
                </FormControl>

              </Grid> */}
              {/* <Grid item xs={12}>
                <div class="form-check">
                  <input 
                    class="form-check-input" 
                    type="checkbox" 
                    onChange={(e)=> {
                      console.log(e.target.value)
                    }}
                    id="flexCheckDefault" 
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <Link >Agree to all Terms & Conditions</Link>
                  </label>
                </div>
              </Grid> */}
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} />? */}
      </Container>
    </ThemeProvider>
  );
}

