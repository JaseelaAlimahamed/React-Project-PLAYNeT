import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/user/Navbar'
import Footer from '../components/user/Footer'

function UserLayout() {
  const location = useLocation();
  return (
    <div>
        {location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgotPwd' && <Navbar/> }

        <Outlet />
        {location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgotPwd' && <Footer/> }
    </div>
  )
}

export default UserLayout