import React, {useState,useEffect} from 'react';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useAuth from '../Hook/useAuth';
import image1 from '../../assets/image1.jpg';
import logo from '../../assets/logo.png';

const supabaseUrl = 'https://gyxpanwekhoqwqqzilhb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5eHBhbndla2hvcXdxcXppbGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzM2MDksImV4cCI6MjA1NzAwOTYwOX0.M3agjTfQ0cIc5BgAYWmbV7IyMq7VhIX9ua5dz1PW40I"
const supabase = createClient(supabaseUrl, supabaseKey)

const Products = ()=> {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const statusMail = localStorage.getItem('email')
    const statusPass = localStorage.getItem('password')
    const id = localStorage.getItem('id')
    const [items, setItems] = useState([])

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

    const getItems = async ()=> {
      let { data: items, error } = await supabase
      .from('items')
      .select('*')

      setItems(items.reverse())
        
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

    const handleCart = async (item)=> {
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
      <h3 class="text-white mt-2">Shop</h3>
      {/* <!-- Breadcrumb --> */}
      <nav class="d-flex mb-2">
        <h6 class="mb-0">
          <a href="#/" class="text-white-50">Home</a>
          <span class="text-white-50 mx-2"> </span>
          <a href="#/products" class="text-white"><u>Shop</u></a>
          <span class="text-white-50 mx-2"> </span>
          <a href="#/contact" class="text-white-50"><u>Contact</u></a>
        </h6>
      </nav>
      {/* <!-- Breadcrumb --> */}
    </div>
  </div>
  {/* <!-- Heading --> */}
</header>

{/* <!-- sidebar + content --> */}
<section class="">
  <div class="container">
    <div class="row">
      {/* <!-- sidebar --> */}
      {/* <div class="col-lg-"> */}
        {/* <!-- Toggle button --> */}
        {/* <button
                class="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
          <span>Show filter</span>
        </button> */}
        {/* <!-- Collapsible wrapper --> */}
        {/* <div class="collapse card d-lg-block mb-5" id="navbarSupportedContent"> */}
          {/* <div class="accordion" id="accordionPanelsStayOpenExample"> */}
            {/* <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                        class="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                        >
                  Related items
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne">
                <div class="accordion-body">
                  <ul class="list-unstyled">
                    <li><a href="#" class="text-dark">Electronics </a></li>
                    <li><a href="#" class="text-dark">Home items </a></li>
                    <li><a href="#" class="text-dark">Books, Magazines </a></li>
                    <li><a href="#" class="text-dark">Men's clothing </a></li>
                    <li><a href="#" class="text-dark">Interiors items </a></li>
                    <li><a href="#" class="text-dark">Underwears </a></li>
                    <li><a href="#" class="text-dark">Shoes for men </a></li>
                    <li><a href="#" class="text-dark">Accessories </a></li>
                  </ul>
                </div>
              </div>
            </div> */}
            {/* <div class="accordion-item"> */}
              {/* <h2 class="accordion-header" id="headingTwo">
                <button
                        class="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseTwo"
                        >
                  Brands
                </button>
              </h2> */}
              {/* <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo">
                <div class="accordion-body">
                  <div> */}
                    {/* <!-- Checked checkbox --> */}
                    {/* <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked1" checked />
                      <label class="form-check-label" for="flexCheckChecked1">Mercedes</label>
                      <span class="badge badge-secondary float-end">120</span>
                    </div> */}
                    {/* <!-- Checked checkbox --> */}
                    {/* <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked2" checked />
                      <label class="form-check-label" for="flexCheckChecked2">Toyota</label>
                      <span class="badge badge-secondary float-end">15</span>
                    </div> */}
                    {/* <!-- Checked checkbox --> */}
                    {/* <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked3" checked />
                      <label class="form-check-label" for="flexCheckChecked3">Mitsubishi</label>
                      <span class="badge badge-secondary float-end">35</span>
                    </div> */}
                    {/* <!-- Checked checkbox --> */}
                    {/* <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked4" checked />
                      <label class="form-check-label" for="flexCheckChecked4">Nissan</label>
                      <span class="badge badge-secondary float-end">89</span>
                    </div> */}
                    {/* <!-- Default checkbox --> */}
                    {/* <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label class="form-check-label" for="flexCheckDefault">Honda</label>
                      <span class="badge badge-secondary float-end">30</span>
                    </div> */}
                    {/* <!-- Default checkbox --> */}
                    {/* <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label class="form-check-label" for="flexCheckDefault">Suzuki</label>
                      <span class="badge badge-secondary float-end">30</span>
                    </div> */}
                  {/* </div>
                </div>
              </div> */}
            {/* </div> */}
            {/* <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                        class="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                        >
                  Price
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="headingThree">
                <div class="accordion-body">
                  <div class="range">
                    <input type="range" class="form-range" id="customRange1" />
                  </div>
                  <div class="row mb-3">
                    <div class="col-6">
                      <p class="mb-0">
                        Min
                      </p>
                      <div class="form-outline">
                        <input type="number" id="typeNumber" class="form-control" />
                        <label class="form-label" for="typeNumber">$0</label>
                      </div>
                    </div>
                    <div class="col-6">
                      <p class="mb-0">
                        Max
                      </p>
                      <div class="form-outline">
                        <input type="number" id="typeNumber" class="form-control" />
                        <label class="form-label" for="typeNumber">$1,0000</label>
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-white w-100 border border-secondary">apply</button>
                </div>
              </div>
            </div> */}
            {/* <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                        class="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour"
                        >
                  Size
                </button>
              </h2>
              <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse show" aria-labelledby="headingThree">
                <div class="accordion-body">
                  <input type="checkbox" class="btn-check border justify-content-center" id="btn-check1" checked autocomplete="off" />
                  <label class="btn btn-white mb-1 px-1" style={{width: '60px'}} for="btn-check1">XS</label>
                  <input type="checkbox" class="btn-check border justify-content-center" id="btn-check2" checked autocomplete="off" />
                  <label class="btn btn-white mb-1 px-1" style={{width: '60px'}} for="btn-check2">SM</label>
                  <input type="checkbox" class="btn-check border justify-content-center" id="btn-check3" checked autocomplete="off" />
                  <label class="btn btn-white mb-1 px-1" style={{width: '60px'}} for="btn-check3">LG</label>
                  <input type="checkbox" class="btn-check border justify-content-center" id="btn-check4" checked autocomplete="off" />
                  <label class="btn btn-white mb-1 px-1" style={{width: '60px'}} for="btn-check4">XXL</label>
                </div>
              </div>
            </div> */}
            {/* <div class="accordion-item"> */}
              {/* <h2 class="accordion-header" id="headingThree">
                <button
                        class="accordion-button text-dark bg-light"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#panelsStayOpen-collapseFive"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFive"
                        >
                  Ratings
                </button>
              </h2> */}
              <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse show" aria-labelledby="headingThree">
                <div class="accordion-body">
                  {/* <!-- Default checkbox --> */}
                  {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                    <label class="form-check-label" for="flexCheckDefault">
                      <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                    </label>
                  </div> */}
                  {/* <!-- Default checkbox --> */}
                  {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                    <label class="form-check-label" for="flexCheckDefault">
                      <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-secondary"></i>
                    </label>
                  </div> */}
                  {/* <!-- Default checkbox --> */}
                  {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                    <label class="form-check-label" for="flexCheckDefault">
                      <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i>
                      <i class="fas fa-star text-secondary"></i>
                    </label>
                  </div> */}
                  {/* <!-- Default checkbox --> */}
                  {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                    <label class="form-check-label" for="flexCheckDefault">
                      <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-secondary"></i><i class="fas fa-star text-secondary"></i>
                      <i class="fas fa-star text-secondary"></i>
                    </label>
                  </div> */}
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
          {/* </div> */}
        </div>
      </div>
      {/* <!-- sidebar --> */}
      {/* <!-- content --> */}
      <div class="col-lg-12">
        {/* <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
          <strong class="d-block py-2">32 Items found </strong>
          <div class="ms-auto">
            <select class="form-select d-inline-block w-auto border pt-1">
              <option value="0">Best match</option>
              <option value="1">Recommended</option>
              <option value="2">High rated</option>
              <option value="3">Randomly</option>
            </select>
            <div class="btn-group shadow-0 border">
              <a href="#" class="btn btn-light" title="List view">
                <i class="fa fa-bars fa-lg"></i>
              </a>
              <a href="#" class="btn btn-light active" title="Grid view">
                <i class="fa fa-th fa-lg"></i>
              </a>
            </div>
          </div>
        </header> */}

    <div class="row">
      {items.map((item)=> 
        <div class="col-lg-4 col-md-6 col-sm-6 d-flex">
          <div class="card w-100 my-2 shadow-2-strong">
            <img src={item.img} class="card-img-top" style={{aspectRatio: 1 / 1}} />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{item.name}</h5>
              <p class="text-mute">{item.description}</p>
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

                      if(error) {
                        Swal.fire({
                          icon: "error",
                          title: "Can't add item to cart",
                          text: "Try again later",
                          showConfirmButton: false,
                          timer: 1500
                        });
                      }
                      else {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Added to cart",
                          showConfirmButton: false,
                          timer: 1500
                        });
                      }
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

        <hr />

        {/* <!-- Pagination --> */}
        {/* <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-3">
          <ul class="pagination">
            <li class="page-item disabled">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav> */}
        {/* <!-- Pagination --> */}
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
<a href="#/" target="_blank" class="">
  <img src={logo} height="200" />
</a>
          {/* <!-- Links --> */}
          {/* <h6 class="text-uppercase text-light fw-bold mb-2">Newsletter</h6>
          <p class="text-light">Stay in touch with latest updates about our products and offers</p>
          <div class="input-group mb-3">
            <input type="email" class="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" />
            <button class="btn btn-light border shadow-0" type="button" id="button-addon2" data-mdb-ripple-color="dark">
              Join
            </button>
          </div> */}
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