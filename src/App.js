import {createHashRouter, Navigate} from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ResetPassword from "./components/Auth/ResetPassword";
import Feedback from "./components/Views/Feedback";
import NotFound from "./components/Views/NotFound";
import RequireAuth from './components/RequireAuth/RequireAuth';
import Index from "./components/Index";


const App = createHashRouter([
  {
    index: 'true',
    path:'login',
    element: <SignIn/>
  },
  {
    path:'register',
    element: <SignUp/>
  },
  {
    path:'reset-password',
    element: <ResetPassword/>
  },
  {
    element: <RequireAuth/>,
    children: [
      {
        path: '/',
        element: <Index/>,
        children: [
          {
            path: 'feedback',
            element: <Feedback/>
          }
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
