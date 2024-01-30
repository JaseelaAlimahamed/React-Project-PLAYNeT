import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import LoginPage from '../pages/admin/LoginPage'
import AuthenticatedRoute from '../middleware/admin/AuthenticatedRoute'
import VenueFeaturesPage from '../pages/admin/VenueFeaturesPage'
import AdminLayout from '../layouts/AdminLayout'
import VendorDetails from '../pages/admin/VendorDetails'
import UserDetailPage from '../pages/admin/UserDetailPage'
import BookingDetailsPage from '../pages/admin/BookingDetailsPage'
import VenuesDtailPage from '../pages/admin/VenuesDtailPage'

function AdminRoutes() {
    return (

        <Routes>
            <Route element={<AdminLayout/>}>
                <Route index element={<AuthenticatedRoute><AdminDashboard /></AuthenticatedRoute>} />
                <Route path="login" element={<LoginPage />} />
                <Route path="features" element={<AuthenticatedRoute><VenueFeaturesPage /></AuthenticatedRoute>} />
                <Route path="vendors" element={<AuthenticatedRoute><VendorDetails/></AuthenticatedRoute>} />
                <Route path="users" element={<AuthenticatedRoute><UserDetailPage/></AuthenticatedRoute>} />
                <Route path="bookings" element={<AuthenticatedRoute><BookingDetailsPage/></AuthenticatedRoute>} />
                <Route path="venues" element={<AuthenticatedRoute><VenuesDtailPage/></AuthenticatedRoute>} />

            </Route>
        </Routes>
    )
}

export default AdminRoutes;
