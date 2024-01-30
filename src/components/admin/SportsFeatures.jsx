import React, { useEffect, useState } from "react";

import axios from "../../api/axios";
import swal from 'sweetalert'
import toast,{ Toaster } from "react-hot-toast";
import {getDetails} from "../../services/adminAxios"
import AddSportModal from "./modals/AddSportModal";

import {
  Cricket,
  Football,
  Volleyball,
  Badminton,
  Tennis,
} from "../user/images/Sports";
import { IoTrendingUp } from "react-icons/io5";
import { changeStatus } from "../../services/adminAxios";






function SportsFeature() {  

  const [isModalAddSportOpen, setIsModalAddSportOpen] = useState(false);

  const [update,setUpdate] = useState([]);
  
 
  
  const openModalAddSport = () => {
    setIsModalAddSportOpen(true);
  };
  
  const closeModalAddSport = () => {

    setIsModalAddSportOpen(false);

    setUpdate(prevState => !prevState);
  };
  
  const [sports, setSports] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetails();
        setSports(data.sportsDatas);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [update]);



  const handleAction = async (_id, facility, status, sportName) => {
    const facilityData = {
      _id,
      facility,
      status,
    };
  
    const confirm = await swal({
      title: `Do you want to ${status ? 'enable' : 'disable'}`,
      text: `Are you sure you want to ${status ? `enable ${facility} facility of ${sportName}?` : `disable ${facility} facility of ${sportName}?`}`,
      icon: 'warning',
      buttons: ['Cancel', `${status ? "Enable" : "Disable"}`],
      dangerMode: !status,
    });
  
    if (confirm) {
      const token = localStorage.getItem('admin');
  
      try {

        const response = changeStatus(facilityData)
  
        setSports(
          sports.map((sport) =>
            sport._id === _id
              ? {
                  ...sport,
                  facilityDetails: sport.facilityDetails.map((perFacility) =>
                    perFacility.facility === facility ? { ...perFacility, status: status } : perFacility
                  ),
                }
              : sport
          )
        );
  
        toast.success(`${sportName + ',' + facility} ${status ? "Enabled" : "Disabled"} successfully!`);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  
  return (
    <div className="mt-16 w-100 p-4 h-full sm:ml-0 z-0 opacity-95 bg-emerald-900 relative">
    <Toaster position="top-center "/>
    <div className="p-1 border-gray-200 z-0 rounded-lg dark:border-emerald-700 mt-6 sticky top-0">
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg m-1 capitalize text-[#D4F1F4]">SPORTS</p>
        <button className="border border-white rounded-md text-white p-2" onClick={() => {openModalAddSport(); setUpdate(true);} }>ADD SPORTS</button>
      </div>
          {/* <button className="bg-[#189AB4] text-[#D4F1F4] py-1 px-3 rounded-lg mb-1 hover:bg-[#28a2bb]">
            Edit
          </button> */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen">
          <table className="w-full  text-left text-[#D4F1F4] dark:text-blue-100">
            
            <thead className="text-xs text-[#D4F1F4] uppercase bg-emerald-700 dark:text-white">
              <tr className="border bg-emerald-700">
                <th scope="col" className="px-6 py-3">
                  Logo
                </th>
                <th scope="col" className="px-6 py-3">
                  Sports
                </th>
                <th scope="col" className="px-6 py-3">
                  Facilities
                </th>
              </tr>
            </thead>
            {sports.length ? (
              <tbody>
                {sports.map((sport) => (
                  <tr className="bg-emerald-800 border-b border-[#05445E]">
                    <th
                      scope="row"
                      className="px-6 py-4 text-2xl font-bold text-[#D4F1F4] whitespace-nowrap dark:text-[#D4F1F4]"
                    >
                      {sport.sport === "Football" ? (
                        <Football />
                      ) : sport.sport === "Cricket" ? (
                        <Cricket />
                      ) : sport.sport === "Volley ball" ? (
                        <Volleyball />
                      ) : sport.sport === "Badminton" ? (
                        <Badminton />
                      ) : sport.sport === "Tennis" ? (
                        <Tennis />
                      ):( "No Logo"
                        
                      )}
                    </th>
                    <td className="px-6 py-4 uppercase">{sport.sport}</td>
                    <td className="px-6 py-4">
                      <ul className="w-48 text-sm font-medium text-gray-900 bg-emerald-900 border border-gray-200 rounded-lg dark:bg-emerald-900 dark:border-emarald-600 dark:text-white">
                        {sport.facilityDetails.map((facility) => (
                          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-emaralad-600">
                            <div className="flex justify-between p-2">
                              
                              <label
                                htmlfor="vue-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-[#D4F1F4] dark:text-gray-300"
                              >
                                {facility.facility}
                              </label>
                              <button
                                className={`${
                                  facility.status
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-green-600 hover:bg-green-700"
                                } text-white px-2 rounded`}
                                onClick={() =>
                                  handleAction(
                                    sport._id,
                                    facility.facility,
                                    !facility.status,
                                    sport.sport
                                  )
                                }
                              >
                                {facility.status ? "disable" : "enable"}
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody><tr className="p-4">no sports available</tr></tbody> 
              )}
            </table>
        </div>
      </div>

      <AddSportModal
        isOpen={isModalAddSportOpen}
        onClose={closeModalAddSport}
      />
    </div>
  );
}

export default SportsFeature;
