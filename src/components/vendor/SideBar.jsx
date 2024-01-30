import React, { useState, useEffect } from 'react';
import './SideBars.css';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  

  
  useEffect(() => {
    const currentPath = location.pathname;
    const links = document.querySelectorAll('.sidebars ul li a');
    links.forEach((link) => {
      if (link.getAttribute('href') === currentPath) {
        setActiveLink(link.getAttribute('href'));
      }
    });
  }, [location]);

  return (
    
    <div className='sidebars'>
      <ul>
        <li>
          <Link
            to="/vendor/"
            className={activeLink === '/vendor/'? 'active' : ''}
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
            to="/vendor/bookingSuccess"
            className={activeLink === '/vendor/bookingSuccess' ? 'active' : ''}
          >
            Completed Bookings
          </Link>
        </li>

        <li>
          <Link
            to="/vendor/bookingCancelled"
            className={activeLink === '/vendor/bookingCancelled' ? 'active' : ''}
          >
            Cancelled Bookings
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
