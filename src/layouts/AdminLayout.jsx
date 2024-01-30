import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import SidebarAdmin from '../components/admin/SidebarAdmin';
import NavbarAdmin from '../components/admin/NavbarAdmin';


function AdminLayout() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== '/admin/login' && < NavbarAdmin />}
      <div className="flex ">
        <div className='sticky'  >
          {location.pathname !== '/admin/login' && <SidebarAdmin />}
        </div>
          <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout