import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/user/Home'
import UnAuthenticatedRoute  from "../middleware/user/UnAuthenticatedRoute";
import Signup from '../pages/user/Signup'
import Signin from '../pages/user/Signin'
import UserLayout from '../layouts/UserLayout';
import SingleVenue from '../pages/user/SingleVenue';
import ConfirmationPage from '../pages/user/ConfirmationPage';
function UserRoutes() {
  return (
    <Routes>
  <Route element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route path="signin" element={<UnAuthenticatedRoute><Signin/></UnAuthenticatedRoute>}  />
    <Route path="venue/:id" element={<SingleVenue />} />
    <Route path='confirmation' element={<ConfirmationPage/>}/>
    </Route>
  </Routes>
  )
}

export default UserRoutes
