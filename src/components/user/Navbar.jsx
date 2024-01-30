import React, { useState, useEffect } from 'react';
import icon from '../../public/1683957693688-thumbnail-removebg-preview.png'
import { IoMenu, IoClose } from 'react-icons/io5';
// 
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary"
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Navbar() {

  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //  toggle menu

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let user = useSelector((state) => state);
  console.log(user.user);

  // scoll

  return (

    <div className={`w-full h-16 fixed top-0 left-0 z-50 shadow-2xl ${isScrolled ? 'bg-green-800 border-b border-black' : 'bg-black bg-opacity-40'}`}>
      <div className="flex justify-between">
        <img src={icon} width="70" height="70" className="mx-7" alt="..." onClick={() => navigate('/')} />
        <div className="cursor-pointer mr-8 mt-5" onClick={toggleMenu}>
          {isOpen ? (
            <IoClose size={24} className="text-white" />
          ) : (
            <IoMenu size={24} className="text-white" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="bg-black w-70 bg-opacity-30 text-white absolute top-8 right-3 mt-2  p-4 mr-4 rounded shadow-lg">
          <ul className='m-4'>
          <Link to="/"><li className="border-b border-black-100 py-2">HOME</li></Link>
            {user.user.isLoggedIn ? (
              <div>
              <button className="border-b border-black-100 py-2" onClick={openLogoutModal}>
                LOG OUT
              </button>
              <Link to='/profile'>
              <li className="border-b border-black-100 py-2">PROFILE</li>
              </Link>
              </div>
            ) : (
              <Link to="/signin">
                <li className="border-b border-black-100 py-2">SIGN IN</li>
              </Link>
            )}
            <Link to="/vendor/signin"><li className="border-b border-dark-100 py-2">PARTNER WITH US</li></Link>
            <li className="border-b border-dark-100 py-2">CONTACT  US</li>
            <li className="border-b border-dark-100 py-2">ABOUT US</li>

          </ul>
        </div>


      )}
        <Modal isOpen={isLogoutModalOpen} onClose={closeLogoutModal} className="Modal" overlayClassName="Overlay">
        <div className="fixed m-24 inset-0 flex items-start justify-center">
          <div className="bg-black bg-opacity-75 rounded-lg p-6">
            <h2 className="text-lg text-white font-semibold">Logout Confirmation</h2>
            <p className="mt-4 text-white">Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-950"
                onClick={() => {
                  dispatch(userLogout());
                  closeLogoutModal();
                }}
              >
                Logout
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-black" onClick={closeLogoutModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

    </div>


  )
}
function NavbarWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <Navbar />
    </ErrorBoundary>
  );
}

export default NavbarWithErrorBoundary;


