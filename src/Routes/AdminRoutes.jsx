import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import LoginPage from '../pages/admin/LoginPage'
import AuthenticatedRoute from '../middleware/admin/AuthenticatedRoute'
import VenueFeaturesPage from '../pages/admin/VenueFeaturesPage'
import AdminLayout from '../components/admin/AdminLayout'

function AdminRoutes() {
    return (

        <Routes>
            <Route element={<AdminLayout/>}>
                <Route index element={<AuthenticatedRoute><AdminDashboard /></AuthenticatedRoute>} />
                <Route path="login" element={<LoginPage />} />
                <Route path="features" element={<VenueFeaturesPage />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes;
