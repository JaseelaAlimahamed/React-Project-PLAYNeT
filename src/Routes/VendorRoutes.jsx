import React from 'react'
import { Routes,Route } from 'react-router-dom'
import SignupPage from '../pages/vendor/SignupPage'
import Dashboard from '../pages/vendor/DashboardPage'
import SigninPage from '../pages/vendor/SigninPage'
import VenuesPage from '../pages/vendor/VenuesPage'

function VendorRoutes() {
  return (
    <Routes>

    <Route index element={<Dashboard />} />
    <Route path="signup" element={<SignupPage />} />
    <Route path="signin" element={<SigninPage />} />
    <Route path="venues" element={<VenuesPage/>} />
    
  </Routes>
  )
}
export default VendorRoutes;