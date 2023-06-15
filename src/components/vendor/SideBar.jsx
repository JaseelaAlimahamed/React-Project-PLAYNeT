import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideBar.css';

function SideBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  useEffect(() => {
    const currentPath = location.pathname;
    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach((link) => {
      if (link.getAttribute('href') === currentPath) {
        setActiveLink(link.getAttribute('href'));
      }
    });
  }, [location]);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'hide'}`}>
      <div className="sidebar-toggle" onClick={handleToggleSidebar}>
        <i className={`fa ${isSidebarOpen ? 'fa-bars' : 'fa-times'}`}></i>
      </div>
      <ul>
        <li>
          <Link
            to="/vendor/"
            className={activeLink === '/vendor/' ? 'active' : ''}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/vendor/venues"
            className={activeLink === '/vendor/venues' ? 'active' : ''}
          >
            Venues
          </Link>
        </li>
        <li>
          <Link
            to="/vendor/completed-bookings"
            className={activeLink === '/vendor/completed-bookings' ? 'active' : ''}
          >
            Completed Bookings
          </Link>
        </li>
        <li>
          <Link
            to="/vendor/pending-bookings"
            className={activeLink === '/vendor/pending-bookings' ? 'active' : ''}
          >
            Pending Bookings
          </Link>
        </li>
        <li>
          <Link
            to="/vendor/blocked-bookings"
            className={activeLink === '/vendor/blocked-bookings' ? 'active' : ''}
          >
            Blocked Bookings
          </Link>
        </li>
        <li>
          <Link
            to="/vendor/profile"
            className={activeLink === '/vendor/profile' ? 'active' : ''}
          >
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
