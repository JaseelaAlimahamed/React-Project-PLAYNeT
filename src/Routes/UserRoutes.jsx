import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/user/Home'
import UnAuthenticatedRoute from "../middleware/user/UnAuthenticatedRoute";
import Signup from '../pages/user/Signup'
import Signin from '../pages/user/Signin'
import UserLayout from '../layouts/UserLayout';
import SingleVenue from '../pages/user/SingleVenue';
import ConfirmationPage from '../pages/user/ConfirmationPage';
import VenueDistrictPage from '../pages/user/VenueDistrictPage';
import UserProfile from '../pages/user/UserProfile';
import AuthenticatedRoute from '../middleware/user/AuthenticatedRoutes';

function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<UnAuthenticatedRoute><Signin /></UnAuthenticatedRoute>} />
        <Route path="venue/:id" element={<SingleVenue />} />
        <Route path="venue/district/:dist" element={<VenueDistrictPage />} />
        <Route path='confirmation' element={<AuthenticatedRoute><ConfirmationPage /></AuthenticatedRoute>} />
        <Route path='profile' element={<AuthenticatedRoute><UserProfile /></AuthenticatedRoute>} />
        </Route>
    </Routes>
  )
}

export default UserRoutes;
