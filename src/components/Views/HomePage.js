import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';
import image1 from '../../assets/image1.jpg';
import logo from '../../assets/logo.png';

const supabaseUrl = 'https://snvtwjqwiombpwqzizoe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudnR3anF3aW9tYnB3cXppem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5NzUwNDcsImV4cCI6MjAyNjU1MTA0N30.frr4AozItNRzCyJTyHLkoGzg-CcN0uukd8-JMvw97bo"
const supabase = createClient(supabaseUrl, supabaseKey)



const HomePage = ()=> {
    const navigate = useNavigate();
    const statusMail = localStorage.getItem('email')
    const statusPass = localStorage.getItem('password')
    const [items, setItems] = useState([])
    const id = localStorage.getItem('id')

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

    const getItems = async ()=> {
      let { data: items, error } = await supabase
      .from('items')
      .select('*')
      .range(0, 3)

      setItems(items)
      console.log(items)
      console.log(error)
        
    }

    useEffect(() => {
      const controller = new AbortController();
      var isMounted = true

      getItems()

      return () => {
        isMounted = false
        controller.abort();
    }
    }, [])
    

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
        {/* <!-- Left elements -->

        <!-- Center elements --> */}
        <div class="order-lg-last col-lg-5 col-sm-8 col-8">
          <div class="d-flex float-end">
            {SignBtn()}
            {/* <a href="https://github.com/mdbootstrap/bootstrap-material-design" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i class="bi bi-suit-heart-fill m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Wishlist</p> </a> */}
            <button onClick={handleCheckout} class="btn btn-outlined-primary py-1 px-3 nav-link d-flex align-items-center"> <i class="bi bi-cart4 m-1 me-md-2"></i><p class="d-none d-md-block mb-0">My cart</p> </button>
          </div>
          {/* <h5 class="d-flex float-end m-2 text-primary">Hello</h5> */}
        </div>
        {/* <!-- Center elements -->

        <!-- Right elements --> */}
        <div class="col-lg-5 col-md-12 col-12">
          <div class="input-group float-center">
            {/* <div class="form-outline">
              <input type="search" id="form1" class="form-control" placeholder="Search"/>
            </div>
            <button type="button" class="btn btn-primary shadow-0">
              <i class="bi bi-search"></i>
            </button> */}
          </div>
        </div>
        {/* <!-- Right elements --> */}
      </div>
    </div>
  </div>
  {/* <!-- Jumbotron -->

  <!-- Navbar --> */}
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    {/* <!-- Container wrapper --> */}
    <div class="container justify-content-center justify-content-md-between">
      {/* <!-- Toggle button --> */}
      <button
              class="navbar-toggler border py-2 text-dark"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarLeftAlignExample"
              aria-controls="navbarLeftAlignExample"
              aria-expanded="false"
              aria-label="Toggle navigation"
              >
        <i class="bi bi-bars"></i>
      </button>

      {/* <!-- Collapsible wrapper --> */}
      <div class="collapse navbar-collapse" id="navbarLeftAlignExample">
        {/* <!-- Left links --> */}
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link text-dark" aria-current="page" href="#/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark" href="#/products">Shop</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark" href="#/contact">Contact</a>
          </li>

        </ul>
        {/* <!-- Left links --> */}
      </div>
    </div>
    {/* <!-- Container wrapper --> */}
  </nav>
  {/* <!-- Navbar -->
  <!-- Jumbotron --> */}
  <div class="bg-primary text-white py-5">
    <div class="container py-5">
      <h1>
        Best products & <br />
        brands in our store
      </h1>
      <p>
        Trendy Products, Factory Prices, Excellent Service
      </p>
      <button type="button" class="btn btn-outline-light" onClick={()=> navigate('/contact')}>
        Learn more
      </button>
      <button type="button" class="btn btn-light shadow-0 text-primary mx-3 pt-2 border border-white" onClick={()=> navigate('/products')}>
        <span class="pt-1">Purchase now</span>
      </button>
    </div>
  </div>
  {/* <!-- Jumbotron --> */}
</header>
{/* <!-- Products --> */}
<section>
  <div class="container my-5">
    <header class="mb-4">
      <h3>New products</h3>
    </header>

    <div class="row">
      {items?.map((item)=> 
        <div class="col-lg-3 col-md-6 col-sm-6 d-flex">
          <div class="card w-100 my-2 shadow-2-strong">
            <img src={item.img} class="card-img-top" style={{aspectRatio: 1 / 1}} />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{item.name}</h5>
              <h6 class="card-text"><strong>${item.price}</strong></h6>
              <div class="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
              <button 
                onClick={async ()=> {
                  if(statusMail && statusPass) {
                    const { data, error } = await supabase
                      .from('cart')
                      .insert([
                        { 
                          customer_id: id, 
                          item_id: item.id 
                        },
                      ])
                      .select()
                  }
                  else {
                    navigate('/signin')
                  }
                } }
                class="btn btn-primary shadow-0 me-1"
              >Add to cart</button>
                {/* <a href="#!" class="btn btn-light border px-2 pt-2 icon-hover"><i class="fas fa-heart fa-lg text-secondary px-1"></i></a> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</section>
{/* <!-- Products -->

<!-- Feature --> */}
<section class="mt-5" style={{backgroundColor: "#f5f5f5"}}>
  <div class="container text-dark pt-3">
    <header class="pt-4 pb-3">
      <h3>Why choose us</h3>
    </header>

    <div class="row mb-4">
      <div class="col-lg-4 col-md-6">
        <figure class="d-flex align-items-center mb-4">
          <span class="rounded-circle bg-white p-3 d-flex me-2 mb-2">
            <i class="bi bi-camera-fill bi-2x fa-fw text-primary floating"></i>
          </span>
          <figcaption class="info">
            <h6 class="title">Reasonable prices</h6>
            <p>We offer competitive prices that cater to your budget without compromising on quality.</p>
          </figcaption>
        </figure>
        {/* <!-- itemside // --> */}
      </div>
      {/* <!-- col // --> */}
      <div class="col-lg-4 col-md-6">
        <figure class="d-flex align-items-center mb-4">
          <span class="rounded-circle bg-white p-3 d-flex me-2 mb-2">
            <i class="bi bi-star-fill bi-2x fa-fw text-primary floating"></i>
          </span>
          <figcaption class="info">
            <h6 class="title">Best quality</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
          </figcaption>
        </figure>
        {/* <!-- itemside // --> */}
      </div>
      {/* <!-- col // --> */}
      <div class="col-lg-4 col-md-6">
        <figure class="d-flex align-items-center mb-4">
          <span class="rounded-circle bg-white p-3 d-flex me-2 mb-2">
            <i class="bi bi-airplane-fill text-primary floating"></i>
          </span>
          <figcaption class="info">
            <h6 class="title">Worldwide shipping</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
          </figcaption>
        </figure>
        {/* <!-- itemside // --> */}
      </div>
      {/* <!-- col // --> */}
      <div class="col-lg-4 col-md-6">
        <figure class="d-flex align-items-center mb-4">
          <span class="rounded-circle bg-white p-3 d-flex me-2 mb-2">
            <i class="bi bi-people-fill text-primary floating"></i>
          </span>
          <figcaption class="info">
            <h6 class="title">Customer satisfaction</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
          </figcaption>
        </figure>
        {/* <!-- itemside // --> */}
      </div>
      {/* <!-- col // --> */}
      <div class="col-lg-4 col-md-6">
        <figure class="d-flex align-items-center mb-4">
          <span class="rounded-circle bg-white p-3 d-flex me-2 mb-2">
            <i class="bi bi-hand-thumbs-up-fill text-primary floating"></i>
          </span>
          <figcaption class="info">
            <h6 class="title">Happy customers</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
          </figcaption>
        </figure>
        {/* <!-- itemside // --> */}
      </div>
      {/* <!-- col // --> */}
      <div class="col-lg-4 col-md-6">
        <figure class="d-flex align-items-center mb-4">
          <span class="rounded-circle bg-white p-3 d-flex me-2 mb-2">
            <i class="bi bi-box-seam-fill text-primary floating"></i>
          </span>
          <figcaption class="info">
            <h6 class="title">Thousand items</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
          </figcaption>
        </figure>
        {/* <!-- itemside // --> */}
      </div>
      {/* <!-- col // --> */}
    </div>
  </div>
  {/* <!-- container end.// --> */}
</section>
{/* <!-- Feature -->

<!-- Blog --> */}
{/* <section class="mt-5 mb-4">
  <div class="container text-dark">
    <header class="mb-4">
      <h3>Blog posts</h3>
    </header>

    <div class="row"> */}
      {/* <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <article>
          <a href="#" class="img-fluid">
            <img class="rounded w-100" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/1.webp" style={{objectFit: "cover"}} height="160" />
          </a>
          <div class="mt-2 text-muted small d-block mb-1">
            <span>
              <i class="fa fa-calendar-alt fa-sm"></i>
              23.12.2022
            </span>
            <a href="#"><h6 class="text-dark">How to promote brands</h6></a>
            <p>When you enter into any new area of science, you almost reach</p>
          </div>
        </article>
      </div> */}
      {/* <!-- col.// --> */}
      {/* <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <article>
          <a href="#" class="img-fluid">
            <img class="rounded w-100" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/2.webp" style={{objectFit: "cover"}} height="160" />
          </a>
          <div class="mt-2 text-muted small d-block mb-1">
            <span>
              <i class="fa fa-calendar-alt fa-sm"></i>
              13.12.2022
            </span>
            <a href="#"><h6 class="text-dark">How we handle shipping</h6></a>
            <p>When you enter into any new area of science, you almost reach</p>
          </div>
        </article>
      </div> */}
      {/* <!-- col.// --> */}
      {/* <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <article>
          <a href="#" class="img-fluid">
            <img class="rounded w-100" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/3.webp" style={{objectFit: "cover"}} height="160" />
          </a>
          <div class="mt-2 text-muted small d-block mb-1">
            <span>
              <i class="fa fa-calendar-alt fa-sm"></i>
              25.11.2022
            </span>
            <a href="#"><h6 class="text-dark">How to promote brands</h6></a>
            <p>When you enter into any new area of science, you almost reach</p>
          </div>
        </article>
      </div> */}
      {/* <!-- col.// --> */}
      {/* <div class="col-lg-3 col-md-6 col-sm-6 col-12">
        <article>
          <a href="#" class="img-fluid">
            <img class="rounded w-100" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/posts/4.webp" style={{objectFit: "cover"}} height="160" />
          </a>
          <div class="mt-2 text-muted small d-block mb-1">
            <span>
              <i class="fa fa-calendar-alt fa-sm"></i>
              03.09.2022
            </span>
            <a href="#"><h6 class="text-dark">Success story of sellers</h6></a>
            <p>When you enter into any new area of science, you almost reach</p>
          </div>
        </article>
      </div> */}
    {/* </div>
  </div>
</section> */}
{/* <!-- Blog -->

<!-- Footer --> */}
<footer class="text-center text-lg-start text-muted mt-3" style={{backgroundColor: "#f5f5f5"}}>
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
          <p class="mt-2 text-dark">
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
          <h6 class="text-uppercase text-dark fw-bold mb-2">
            Quick Links
          </h6>
          <ul class="list-unstyled mb-4">
            <li><a class="text-muted" href="#/">Home</a></li>
            <li><a class="text-muted" href="#/products">Shop</a></li>
            <li><a class="text-muted" href="#/contact">Contact</a></li>
            <li><a class="text-muted" href="#/admin/customers">Admin</a></li>
          </ul>
        </div>
        {/* <!-- Grid column -->

        <!-- Grid column --> */}
        <div class="col-6 col-sm-4 col-lg-2">
          {/* <!-- Links --> */}
          {/* <h6 class="text-uppercase text-dark fw-bold mb-2">
            Admin
          </h6>
          <ul class="list-unstyled mb-4">
            <li><a class="text-muted" href="#">Portal</a></li>
          </ul> */}
        </div>
        {/* <!-- Grid column -->


        <!-- Grid column --> */}
        <div class="col-12 col-sm-12 col-lg-3">
          {/* <!-- Links --> */}
          <h6 class="text-uppercase text-dark fw-bold mb-2">Newsletter</h6>
          <p class="text-muted">Stay in touch with latest updates about our products and offers</p>
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

export default HomePage;