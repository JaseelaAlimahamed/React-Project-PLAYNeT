import React from 'react';
import { ShareIcon } from "./images/ShareIcon";
import { Cricket, Football, Badminton } from "./images/Sports";
import { getVenue } from '../../services/userAxios';
import { Link, useNavigate } from "react-router-dom";



function Card({_id, image, discountPercentage, venueName, district, place, actualPrice, sportFacility }) {

    const navigate = useNavigate();
    
    return (
        <div
            className="w-full p-4 lg:w-72 2xl:w-80 rounded-lg shadow-xl mt-20 scale-100 hover:scale-105 ease-in duration-200 bg-white" onClick={() => navigate(`/venue/${_id}`)}
        >
            <div className="wrapper antialiased -mt-16">
                <img src={image} alt="turfImage" className="h-44 w-full object-cover rounded-lg shadow-md " />
            </div>
            <div className="flex justify-between mt-3">
                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">{discountPercentage}% off</span>
                <ShareIcon />
            </div>
            <h4 className="mt-1 text-md md:text-xl font-semibold uppercase leading-tight truncate">{venueName}</h4>
            <div className="sm:mt-1">{district}</div>
            <div className=" sm:mt-0 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                    <p className="mt-3 hidden sm:block text-[#4f4c4a]">place {place} </p>
                    <div className="flex items-center ">
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>First star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Second star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Third star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fourth star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Fifth star</title>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>
                </div>
                <div className="-mt-2 sm:-mt-0 flex flex-row sm:flex-col items-end ">
                    <h2 className="font-semibold sm:font-bold mt-3 text-start sm:text-end">₹{actualPrice}</h2>
                    <p className="text-[#4f4c4a] ml-1">onwards</p>
                </div>
            </div>
            <div className="text-xl md:text-2xl mt-1 flex gap-3 text-grey-500">
                {sportFacility.map((facility) => (
                    <React.Fragment key={facility._id}>
                        {facility.sport === "Football" && <Football />}
                        {facility.sport === "Cricket" && <Cricket />}
                        {facility.sport === "Badminton" && <Badminton />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Card;
