import React, { useState } from 'react';
import showPwdImg from '../../assets/show.svg';
import hidePwdImg from '../../assets/hide.svg';
import google from '../../assets/google.png'
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import useAuth from '../Hook/useAuth';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'

const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [type, setType] = useState('password')
  const [pwd, setPwd] = useState('');
  const [data, setData] = useState([]);
  const [isRevealPwd, setIsRevealPwd] = useState('bx bx-hide eye-icon');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let { data: customers, error } = await supabase
        .from('customers')
        .select('*')

        setData(customers)

        console.log(customers)

        // Iterate through each user object in the array
        for (const customer of customers) {
            // Compare the values associated with the 'email' and 'password' keys
            if (customer.email === email) {
                localStorage.setItem('email', 'true');
                // navigate('/home')
            }
            else {
                localStorage.setItem('email', 'false');
            }
        }

        // Iterate through each user object in the array
        for (const customer of customers) {
            // Compare the values associated with the 'email' and 'password' keys
            if (customer.password === password) {
                localStorage.setItem('password', 'true');
                localStorage.setItem('id', customer.id); 
            }
        }

        const validmail = localStorage.getItem('email')
        const validpassword = localStorage.getItem('password')

        console.log(validmail)
        console.log(validpassword)

        if (validmail && validpassword) {
            navigate('/')
        }
        else(
            setErrMsg('Invalid username or password')
        )

        // if(error) {
        //     setErrMsg(error.message)
        // }
        // else {
        // const {
        //     data: { session },
        // } = await supabase.auth.getSession()

        // const { user } = session 

        // setAuth(user)
    };

  const handleChange = ()=> {
    if(type === 'password') {
        setType('text');
        setIsRevealPwd('bx bx-show eye-icon'); 
    }
    else {
        setType('password');
        setIsRevealPwd('bx bx-hide eye-icon'); 
    }
  }

  const handleReset = async ()=> {
    let { data: customers, error } = await supabase
    .from('customers')
    .select('*')

    // Iterate through each user object in the array
    for (const customer of customers) {
        // Compare the values associated with the 'email' and 'password' keys
        if (customer.email === email) {
            localStorage.setItem('email', 'true');
            // navigate('/home')
        }
        else {
            localStorage.setItem('email', 'false');
        }
    }

    const validmail = localStorage.getItem('email')

    if(email === '' ) {
        setErrMsg('Enter a valid email'); 
    }
    else {
        if (validmail === 'false') {
            setErrMsg('Invalid email')
        }
        else {
            localStorage.setItem('mail', email);
            navigate('/reset-password');
        }
    }
  }

  return (
    <>
    <div class="d-flex justify-content-center m-4">
        <p><a class="link-opacity-15-hover" href="/">Home</a></p>
        <p><a class="link-opacity-15-hover m-4" href="#/products">Shop</a></p>
        <p><a class="link-opacity-15-hover" href="#/contact">Contact</a></p>
    </div>
    <section class="container-auth forms">
    <div class="formed login">
    <div class="form-content">
        <header class="header">Login</header>
        { errMsg ? 
            <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                {errMsg}
            </Alert> :
            ""          
        }
        <form id="loginForm">
            <div class="field input-field">
                <input type="email" placeholder="Email" class="input" id="email" onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div class="field input-field">
                <input type={type} placeholder="Password" class="password" id="password" onChange={(e)=> setPassword(e.target.value)}/>
                <i class={isRevealPwd} onClick={handleChange}></i>
            </div>

            <div class="form-link">
                <a onClick={handleReset} class="forgot-pass">Forgot password?</a>
            </div>

            <div class="field button-field">
                <button type="button" onClick={handleSubmit} >Login</button>
            </div>
        </form>

        {/* <div class="form-link">
            <span>Don't have an account? <a href="#/signup" class="link signup-link">Signup</a></span>
        </div> */}
    </div>

        {/* <div class="line"></div>

        <div class="media-options">
            <a href="#" class="field facebook">
                <i class='bx bxl-facebook facebook-icon'></i>
                <span>Login with Facebook</span>
            </a>
        </div>

        <div class="media-options">
            <a href="#" class="field google">
                <img src={google} alt="" class="google-img" />
                <span>Login with Google</span>
            </a>
        </div> */}

    </div>
    </section>
    </>
  );
}

export default App;