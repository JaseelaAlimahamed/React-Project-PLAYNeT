import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidebarAdmin.css';

function SidebarAdmin() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  useEffect(() => {
    const currentPath = location.pathname;
    const links = document.querySelectorAll('.sidebarAdmin ul li a');
    links.forEach((link) => {
      if (link.getAttribute('href') === currentPath) {
        setActiveLink(link.getAttribute('href'));
      }
    });
  }, [location]);

  return (
    <div className={`sidebarAdmin ${isSidebarOpen ? 'open' : 'hide'}`}>
      <div className="sidebarAdmin-toggle" onClick={handleToggleSidebar}>
        <i className={`fa ${isSidebarOpen ? 'fa-bars' : 'fa-times'}`}></i>
      </div>
      <ul>
        <li>
          <Link
            to="/admin/"
            className={activeLink === '/admin/' ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/venues"
            className={activeLink === '/admin/venues' ? 'active' : ''}
          >
            Venues
          </Link>
        </li>
        <li>
          <Link
            to="/admin/vendors"
            className={activeLink === '/admin/vendors' ? 'active' : ''}
          >
            Vendors
          </Link>
        </li>
        <li>
          <Link
            to="/admin/bookings"
            className={activeLink === '/admin/bookings' ? 'active' : ''}
          >
            Bookings
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className={activeLink === '/admin/users' ? 'active' : ''}
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/features"
            className={activeLink === '/admin/features' ? 'active' : ''}
          >
           Venue Features
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarAdmin;
