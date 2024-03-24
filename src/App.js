import {createHashRouter, Navigate} from "react-router-dom";
import UserLogin from "./components/Auth/Login";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import Feedback from "./components/Views/admin/Feedback";
import Contact from "./components/Views/Contact";
import Checkout from "./components/Views/Checkout";
import Customers from "./components/Views/admin/Customers";
import NotFound from "./components/Views/NotFound";
import HomePage from "./components/Views/HomePage";
import Products from "./components/Views/Products"
import Items from "./components/Views/admin/Items"
import RequireAuth from './components/RequireAuth/RequireAuth';
import Index from "./components/Index";


const App = createHashRouter([
  {
    index: 'true',
    path: 'home',
    element: <HomePage/>
  },
  {
    path:'login',
    element: <SignIn/>
  },
  {
    path:'register',
    element: <Register/>
  },
  {
    path:'signup',
    element: <SignUp/>
  },
  {
    path:'reset-password',
    element: <ResetPassword/>
  },
  {
    path: 'products',
    element: <Products/>
  },
  {
    path: 'checkout',
    element: <Checkout/>
  },
  {
    path: 'contact',
    element: <Contact/>
  },
  {
    path: 'signin',
    element: <UserLogin/>
  },
  {
    element: <RequireAuth/>,
    children: [
      {
        path: 'admin/',
        element: <Index/>,
        children: [
          {
            path: 'feedback',
            element: <Feedback/>
          },
          {
            path: 'customers',
            element: <Customers/>
          },
          {
            path: 'items',
            element: <Items/>
          },
        ]
      }
      ]
    },
    {
      path: '*',
      element: <NotFound/>
    }
    
])

export default App;
