import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../pages/user/Home'
import UnAuthenticatedRoute  from "../middleware/user/UnAuthenticatedRoute";
import Signup from '../pages/user/Signup'
import Signin from '../pages/user/Signin'
function UserRoutes() {
  return (
    <Routes>

    <Route index element={<Home />} />
    <Route path="signup" element={<Signup />} />
    <Route path="signin" element={<UnAuthenticatedRoute><Signin/></UnAuthenticatedRoute>}  />

    
  </Routes>
  )
}

export default UserRoutes
