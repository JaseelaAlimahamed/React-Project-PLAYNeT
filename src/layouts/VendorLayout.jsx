import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavbarVendor from '../components/vendor/NavbarVendor'
import SideBar from '../components/vendor/SideBar'

function VendorLayout() {
    const location = useLocation()
    return (
        <div>
            <NavbarVendor />
            <div className="flex">
                <div  >
                    { location.pathname!=='/vendor/signin' && location.pathname !== '/vendor/signup' && location.pathname !== '/vendor/pending' && <SideBar/> }
                </div>
                <div >
                    <Outlet/>
                </div>
            </div>
        </div>
    )

}

export default VendorLayout

