import React from 'react'
import DashboardVendor from '../../components/vendor/DashboardVendor'
import NavbarVendor from '../../components/vendor/NavbarVendor'
import SideBar from '../../components/vendor/SideBar'


function Dashboard() {
  return (
    <div>
     <NavbarVendor/>
     <SideBar/>
    <DashboardVendor></DashboardVendor>
    </div>
  )
}

export default Dashboard
