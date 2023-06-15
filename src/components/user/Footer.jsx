import React from 'react';
import Facebook from './images/Facebook.png'
import Instagram from './images/Instagram.png'
import LinkdIn from './images/LinkdIn.png'
import Twitter from './images/Twitter.png'
import { useNavigate } from "react-router-dom";

function Footer() {

    const navigate = useNavigate();

    return (
        <div className="flex justify-between bg-green-800 relative p-12">
            <div className="w-1/3 p-4">
                <h1 className="text-white text-2xl font-bold">QUICK LINKS</h1>
                <ul className="mt-2 text-xl text-white">
                    <li onClick={()=>navigate('/')} className='cursor-pointer'>Home</li>
                    <li>Account</li>
                    <li>Help</li>
                </ul>
            </div>
            <div className="w-1/3 p-4">
                <h1 className="text-white text-2xl font-bold">CONTACT US</h1>
                <ul className="mt-2 text-xl text-white">
                    <li>+91 (984)56525444</li>
                    <li>Kerala</li>
                    <li>INDIA -679562</li>
                </ul>
            </div>
            <div className="w-1/3 p-4">
                <h1 className="text-white text-2xl font-bold">FOLLOW US</h1>
                <p className="mt-2 text-white text-xl">Follow us for more details</p>
                <div className="flex mt-2  text-white">
                    <div  className="m-2">
                       <img className='w-8' src={Facebook} alt=".."/>
                    </div>
                    <div className="m-2">
                    <img className='w-8' src={Instagram} alt=".."/>
                    </div>
                    <div className="m-2">
                    <img className='w-8' src={LinkdIn} alt=".."/>
                    </div>
                    <div className="m-2">
                    <img className='w-8' src={Twitter} alt=".."/>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div>
        </div>
    );
}

export default Footer;
