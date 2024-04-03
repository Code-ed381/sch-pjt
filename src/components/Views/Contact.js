import React, { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useAuth from '../Hook/useAuth';
import logo from '../../assets/logo.png';


const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)

const USER_REGEX = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^(?:\+\d{12}|\d{10})$/;


const Products = ()=> {
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const statusMail = localStorage.getItem('email')
    const statusPass = localStorage.getItem('password')
    const errRef = useRef();
    const userRef = useRef();


    const [fullname, setFullname] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [phone, setPhone] = useState(null);
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

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

    const handleSubmit = async (e)=> {
      e.preventDefault();
      
      if (email != '' && content != '' && fullname != '') {
        if (validEmail == true && validName == true && validPhone == true) {
          const { data, error } = await supabase
          .from('feedback')
          .insert([
          { 
              name: fullname, 
              email: email, 
              phone: phone, 
              content: content, 
          },
          ])
          .select()
    
          if (error) {
              Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Failed to send feedback",
                  showConfirmButton: false,
                  timer: 1500
              });
          }
          else{
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your feedbank was sent",
                  showConfirmButton: false,
                  timer: 1500
              });
    
              setContent('')
              setEmail('')
              setPhone('')
              setFullname('')
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid input values",
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Fill all required fields",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }

    const SignBtn = ()=> {
      if(statusMail && statusPass) {
        return(
          <button 
                onClick={handleLogOut} 
                class="btn btn-primary me-1 py-1 px-3 nav-link d-flex align-items-center text-white" 
            > <i class="bi bi-person-fill m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Sign Out</p> 
          </button>
        )
      }
      else {
        return(
          <button 
                onClick={handleLogin} 
                class="btn btn-primary me-1 py-1 px-3 nav-link d-flex align-items-center text-white" 
            > <i class="bi bi-person-fill m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Sign In</p> 
          </button>
        )
      }
    } 

    const Admin = ()=> {
      if(statusMail && statusPass) {
        return(
          <ul class="list-unstyled mb-4">
          <li><a class="text-light" href="#/">Home</a></li>
          <li><a class="text-light" href="#/products">Shop</a></li>
          <li><a class="text-light" href="#/contact">Contact</a></li>
        </ul>
        )
      }
      else {
        return(
          <ul class="list-unstyled mb-4">
          <li><a class="text-light" href="#/">Home</a></li>
          <li><a class="text-light" href="#/products">Shop</a></li>
          <li><a class="text-light" href="#/contact">Contact</a></li>
          <li><a class="text-light" href="#/admin/customers">Admin</a></li>
        </ul>
        )
      }
    }  

    const handleLogin = ()=> {
      navigate('/signin')
    }

    const handleLogOut = ()=> {
      localStorage.clear()

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged Out",
        showConfirmButton: false,
        timer: 1500
      });

      navigate('/')
    }

    const handleCheckout = ()=> {
      if(statusMail && statusPass) {
        navigate('/checkout')
      }
      else {
        navigate('/signin')
      }
    }

    const handleCart = ()=> {
      if(statusMail && statusPass) {
        alert("logged In")
      }
      else {
        navigate('/login')
      }
    }

    return(
        <>
{/* <!--Main Navigation--> */}
<header>
  {/* <!-- Jumbotron --> */}
  <div class="p-3 text-center bg-white border-bottom">
    <div class="container">
      <div class="row gy-3">
        {/* <!-- Left elements --> */}
        <div class="col-lg-2 col-sm-4 col-4">
          <a href="#/" target="_blank" class="float-start">
            <img src={logo} height="50" />
            {/* <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" /> */}
          </a>
        </div>
        {/* <!-- Left elements --> */}

        {/* <!-- Center elements --> */}
        <div class="order-lg-last col-lg-5 col-sm-8 col-8">
          <div class="d-flex float-end">
            {SignBtn()}
            {/* <a href="https://github.com/mdbootstrap/bootstrap-material-design" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i class="bi bi-suit-heart-fill m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Wishlist</p> </a> */}
            <button onClick={handleCheckout} class="btn btn-outlined-primary py-1 px-3 nav-link d-flex align-items-center"> <i class="bi bi-cart4 m-1 me-md-2"></i><p class="d-none d-md-block mb-0">My cart</p> </button>
          </div>
          {/* <h5 class="d-flex float-end m-2 text-primary">Hello</h5> */}
        </div>
        {/* <!-- Center elements --> */}

        {/* <!-- Right elements --> */}
        <div class="col-lg-5 col-md-12 col-12">
          <div class="input-group float-center">
            {/* <div class="form-outline">
              <input type="search" id="form1" class="form-control" />
              <label class="form-label" for="form1">Search</label>
            </div> */}
            {/* <button type="button" class="btn btn-primary shadow-0">
              <i class="fas fa-search"></i>
            </button> */}
          </div>
        </div>
        {/* <!-- Right elements --> */}
      </div>
    </div>
  </div>
  {/* <!-- Jumbotron --> */}

  {/* <!-- Heading --> */}
  <div class="bg-primary mb-4">
    <div class="container py-4">
      <h3 class="text-white mt-2">Contact</h3>
      {/* <!-- Breadcrumb --> */}
      <nav class="d-flex mb-2">
        <h6 class="mb-0">
          <a href="#/" class="text-white-50">Home</a>
          <span class="text-white-50 mx-2"> </span>
          <a href="#/products" class="text-white-50"><u>Shop</u></a>
          <span class="text-white-50 mx-2"> </span>
          <a href="#/products" class="text-white"><u>Contact</u></a>
        </h6>
      </nav>
      {/* <!-- Breadcrumb --> */}
    </div>
  </div>
  {/* <!-- Heading --> */}
</header>

{/* <!-- sidebar + content --> */}
{/* <!-- Contact 5 - Bootstrap Brain Component --> */}
<section class="py-3 py-md-5 py-xl-8">
  {/* <div class="container">
    <div class="row">
      <div class="col-12 col-md-10 col-lg-8">
        <h3 class="fs-5 mb-2 text-secondary text-uppercase">Contact</h3>
        <h2 class="display-5 mb-4 mb-md-5 mb-xl-8">We're always on the lookout to work with new clients. Please get in touch in one of the following ways.</h2>
      </div>
    </div>
  </div> */}

  <div class="container">
    <div class="row gy-4 gy-md-5 gy-lg-0 align-items-md-center">
      <div class="col-12 col-lg-6">
        <div class="border overflow-hidden">

          <form action="#!">
            <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
              <div class="col-12">
                <label for="fullname" class="form-label">Full Name <span class="text-danger">*</span></label>
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
              </div>
              <div class="col-12 col-md-6">
                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                <div class="input-group">
                  <span class="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>
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
                </div>
              </div>
              <div class="col-12 col-md-6">
                <label for="phone" class="form-label">Phone Number</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                  </span>
                  <input 
                    class={validPhone ? "form-control is-valid" : "form-control" && !phone ? "form-control": "form-control is-invalid"}
                    type="tel" 
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
                    onFocus = {()=> setPhoneFocus(true)}
                    onBlur = {()=> setPhoneFocus(false)}
                  />
                </div>
              </div>
              {/* <div class="col-12">
                <label for="subject" class="form-label">Subject <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="subject" name="subject" value="" required />
              </div> */}
              <div class="col-12">
                <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                <textarea class="form-control" id="message" value={content} name="message" rows="3" onChange={(e)=> setContent(e.target.value)} required></textarea>
              </div>
              <div class="col-12">
                <div class="d-grid">
                  <button class="btn btn-primary btn-lg" type="submit" onClick={handleSubmit}>Send Message</button>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="row justify-content-xl-center">
          <div class="col-12 col-xl-11">
            <div class="mb-4 mb-md-5">
              <div class="mb-3 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-geo" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
                </svg>
              </div>
              <div>
                <h4 class="mb-2">Office</h4>
                <p class="mb-2">Please visit us to have a discussion.</p>
                <hr class="w-50 mb-3 border-dark-subtle" />
                <address class="m-0 text-secondary">8014 Edith Blvd NE, Albuquerque, New York, United States</address>
              </div>
            </div>
            <div class="row mb-sm-4 mb-md-5">
              <div class="col-12 col-sm-6">
                <div class="mb-4 mb-sm-0">
                  <div class="mb-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-telephone-outbound" viewBox="0 0 16 16">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="mb-2">Phone</h4>
                    <p class="mb-2">Please speak with us directly.</p>
                    <hr class="w-75 mb-3 border-dark-subtle" />
                    <p class="mb-0">
                      <a class="link-secondary text-decoration-none" href="tel:+15057922430">(505) 792-2430</a>
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="mb-4 mb-sm-0">
                  <div class="mb-3 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-envelope-at" viewBox="0 0 16 16">
                      <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                      <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="mb-2">Email</h4>
                    <p class="mb-2">Please write to us directly.</p>
                    <hr class="w-75 mb-3 border-dark-subtle" />
                    <p class="mb-0">
                      <a class="link-secondary text-decoration-none" href="mailto:demo@yourdomain.com">demo@yourdomain.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="mb-3 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
                  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
                </svg>
              </div>
              <div>
                <h4 class="mb-2">Opening Hours</h4>
                <p class="mb-2">Explore our business opening hours.</p>
                <hr class="w-50 mb-3 border-dark-subtle"/>
                <div class="d-flex mb-1">
                  <p class="text-secondary fw-bold mb-0 me-5">Mon - Fri</p>
                  <p class="text-secondary mb-0">9am - 5pm</p>
                </div>
                <div class="d-flex">
                  <p class="text-secondary fw-bold mb-0 me-5">Sat - Sun</p>
                  <p class="text-secondary mb-0">9am - 2pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* <!-- sidebar + content --> */}

{/* <!-- Footer --> */}
<footer class="text-center text-lg-start text-muted bg-primary mt-3">
  {/* <!-- Section: Links  --> */}
  <section class="">
    <div class="container text-center text-md-start pt-4 pb-4">
      {/* <!-- Grid row --> */}
      <div class="row mt-3">
        {/* <!-- Grid column --> */}
        <div class="col-12 col-lg-3 col-sm-12 mb-2">
          {/* <!-- Content --> */}
          <a href="#/" target="_blank" class="">
            <img src={logo} height="100" />
          </a>
          <p class="mt-2 text-light">
            © 2024 Copyright: E-commerce Project
          </p>
        </div>
        {/* <!-- Grid column -->
        <!-- Grid column --> */}
        <div class="col-6 col-sm-4 col-lg-2">
          {/* <!-- Links --> */}
          {/* <h6 class="text-uppercase text-dark fw-bold mb-2">
            Support
          </h6>
          <ul class="list-unstyled mb-4">
            <li><a class="text-muted" href="#">Help center</a></li>
            <li><a class="text-muted" href="#">Documents</a></li>
            <li><a class="text-muted" href="#">Account restore</a></li>
            <li><a class="text-muted" href="#">My orders</a></li>
          </ul> */}
        </div>
        {/* <!-- Grid column -->

        <!-- Grid column --> */}
        <div class="col-6 col-sm-4 col-lg-2">
          {/* <!-- Links --> */}
          <h6 class="text-uppercase text-light fw-bold mb-2">
            Quick Links
          </h6>
          {Admin()}
        </div>
        {/* <!-- Grid column -->

        <!-- Grid column --> */}
        <div class="col-6 col-sm-4 col-lg-2">
          {/* <!-- Links --> */}
          {/* <h6 class="text-uppercase text-light fw-bold mb-2">
            Admin
          </h6>
          <ul class="list-unstyled mb-4">
            <li><a class="text-light" href="#">Portal</a></li>
          </ul> */}
        </div>
        {/* <!-- Grid column -->


        <!-- Grid column --> */}
        <div class="col-12 col-sm-12 col-lg-3">
          {/* <!-- Links --> */}
          <h6 class="text-uppercase text-light fw-bold mb-2">Newsletter</h6>
          <p class="text-light">Stay in touch with latest updates about our products and offers</p>
          <div class="input-group mb-3">
            <input type="email" class="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" />
            <button class="btn btn-light border shadow-0" type="button" id="button-addon2" data-mdb-ripple-color="dark">
              Join
            </button>
          </div>
        </div>
        {/* <!-- Grid column --> */}
      </div>
      {/* <!-- Grid row --> */}
    </div>
  </section>
  {/* <!-- Section: Links  --> */}

  <div class="">
    <div class="container">
      <div class="d-flex justify-content-between py-4 border-top">
        {/* <!--- payment ---> */}
        <div>
          <i class="fab fa-lg fa-cc-visa text-dark"></i>
          <i class="fab fa-lg fa-cc-amex text-dark"></i>
          <i class="fab fa-lg fa-cc-mastercard text-dark"></i>
          <i class="fab fa-lg fa-cc-paypal text-dark"></i>
        </div>
        {/* <!--- payment --->

        <!--- language selector ---> */}
        {/* <div class="dropdown dropup">
          <a class="dropdown-toggle text-dark" href="#" id="Dropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false"> <i class="flag-united-kingdom flag m-0 me-1"></i>English </a>

          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="Dropdown">
            <li>
              <a class="dropdown-item" href="#"><i class="flag-united-kingdom flag"></i>English <i class="fa fa-check text-success ms-2"></i></a>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-poland flag"></i>Polski</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-china flag"></i>中文</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-japan flag"></i>日本語</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-germany flag"></i>Deutsch</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-france flag"></i>Français</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-spain flag"></i>Español</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-russia flag"></i>Русский</a>
            </li>
            <li>
              <a class="dropdown-item" href="#"><i class="flag-portugal flag"></i>Português</a>
            </li>
          </ul>
        </div> */}
        {/* <!--- language selector ---> */}
      </div>
    </div>
  </div>
</footer>
{/* <!-- Footer --> */}

        </>
    )
}

export default Products;