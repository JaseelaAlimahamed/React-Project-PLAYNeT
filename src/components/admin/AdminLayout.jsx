import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import SidebarAdmin from './SidebarAdmin';
import NavbarAdmin from './NavbarAdmin';


function AdminLayout() {
  const location = useLocation();
  return (
    <div>
        {location.pathname !== '/admin/login' && < NavbarAdmin/> }
        <Outlet context={{hello:'world'}}/>
    </div>
  )
}

export default AdminLayout