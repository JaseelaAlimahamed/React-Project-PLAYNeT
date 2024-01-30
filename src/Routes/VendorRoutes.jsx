import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignupPage from '../pages/vendor/SignupPage'
import Dashboard from '../pages/vendor/DashboardPage'
import SigninPage from '../pages/vendor/SigninPage'
import VenuesPage from '../pages/vendor/VenuesPage'
import UnAuthenticatedRoute from '../middleware/vendor/UnAuthenticatedRouter'
import AuthenticatedRoute from '../middleware/vendor/AuthenticatedRoute'
import VendorLayout from '../layouts/VendorLayout'
import VenueAddPage from '../pages/vendor/VenueAddPage'
import VendorEditPage from '../pages/vendor/VendorEditPage'
import BookingSuccessPage from '../pages/vendor/BookingSuccessPage';
import BookingCancelledPage from '../pages/vendor/BookingCancelledPage';

function VendorRoutes() {
  return (
    <Routes>
      <Route element={<VendorLayout />}>
        <Route index element={<AuthenticatedRoute><Dashboard/></AuthenticatedRoute>} />
        <Route path="signup" element={<SignupPage/>} />
        <Route path="signin" element={<UnAuthenticatedRoute><SigninPage /></UnAuthenticatedRoute>} />
        <Route path="venues" element={<AuthenticatedRoute><VenuesPage /></AuthenticatedRoute>} />
        <Route path="addVenue" element={<AuthenticatedRoute><VenueAddPage/></AuthenticatedRoute>} />
        <Route path="venues/edit/:id" element={<AuthenticatedRoute><VendorEditPage/></AuthenticatedRoute>} />
        <Route path='bookingSuccess' element={<AuthenticatedRoute><BookingSuccessPage /></AuthenticatedRoute>} />
        <Route path='bookingCancelled' element={<AuthenticatedRoute><BookingCancelledPage /></AuthenticatedRoute>} />
     
      </Route>
    </Routes >
  )
}
export default VendorRoutes;