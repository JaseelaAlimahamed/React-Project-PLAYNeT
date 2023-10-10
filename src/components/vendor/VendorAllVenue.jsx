import React, { useEffect, useState } from "react";
import { ShareIcon } from "../user/images/ShareIcon";
import { Cricket, Football } from "../user/images/ShareIcon";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { turfs } from "../../redux/slices/turf/turfThunk";
import { updateTurfIsBlocked } from "../../redux/slices/turf/turfSlice";
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";
import { changeBlock } from '../../services/turfAxios'

function VendorAllVenue() {

  const [selectedTurfs, setSelectedTurfs] = useState([]);


  const navigate = useNavigate();

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(turfs());
        console.log(data, 'Fetched data');

        setSelectedTurfs(data.payload); // Update the selected turf state
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log(selectedTurfs, "selectedTurfssssssssss");

  // Rest of your component logic



  const handleBlock = async (id, status) => {
    const vendorToken = localStorage.getItem("vendor");
    try {
      const confirm = await swal({
        title: `${status ? "Unblock turf?" : "Block turf?"}`,
        text: `Are you sure you want to ${status ? "Unblock" : "Block"} this turf?`,
        icon: "warning",
        buttons: ["Cancel", `${status ? "Unblock" : "Block"}`],
        dangerMode: status ? false : true,
      });
      if (confirm) {
        await changeBlock(id, vendorToken);
        dispatch(updateTurfIsBlocked({ id }));

        toast.success(`Turf ${status ? "unblocked" : "blocked"} successfully!`);
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };


  return (
    <div class="w-100 p-4 absolute bg-emerald-900 mt-16">
      <Toaster position="top-right" />
      <div class="py-4 rounded-lg dark:border-gray-700 mt-14">
        <div class="grid gap-4 mb-4">
          <div>
            <Link to='/vendor/addVenue' ><button
              className="bg-green-400 font-roboto p-3 rounded-md shadow-lg hover:bg-green-500 duration-300 cursor-pointer float-right"
            >
              Add new venue
            </button></Link>
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-100">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Photo
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Venue name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Activity
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Facility
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Slots
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Document
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Admin Approve Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Admin Block status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {selectedTurfs && selectedTurfs.turfs && selectedTurfs.turfs.length ? ( */}
                {selectedTurfs.length ? (
                  selectedTurfs.map((turf) => (
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={turf.image} alt="" className="h-16" />
                      </th>
                      <td class="px-6 py-4">{turf.venueName}</td>
                      <td class="px-6 py-4">{`${turf.place} , ${turf.district} `}</td>
                      <td class="px-6 py-4">
                        <ul>
                          {turf.sportFacility.map((facility) => (
                            <li key={facility._id}>{facility.sport}</li>
                          ))}
                        </ul>
                      </td>
                      <td class="px-6 py-4">
                        <ul>
                          {turf.sportFacility.map((facility) => (
                            <li key={facility._id}>{facility.facility}</li>
                          ))}
                        </ul>
                      </td>
                      <td class="px-6 py-4">{turf.slots.length}</td>
                      <td class="px-6 py-4 ">
                        <span className="mr-3">&#8377;{turf.actualPrice}</span>
                      </td>
                      <td class="px-6 py-4">{turf.description}</td>
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <img src={turf.document} alt="" className="h-16" />
                      </th>
                      <td class="px-6 py-4">{turf.approved ? "approved" : "not approved"}</td>
                      <td class="px-6 py-4">{turf.isBlocked ? "Blocked" : "Unblocked"}</td>
                      <td class="px-6 py-4 space-x-2">
                        <a
                          href="#"
                          onClick={() => handleBlock(turf._id, turf.vendorIsBlocked)}
                          className={`font-medium rounded ${turf.vendorIsBlocked ? "bg-green-600 hover:bg-green-700 duration-300" : "bg-red-600 hover:bg-red-700 duration-300"} p-2 text-white `}
                        >
                          {turf.vendorIsBlocked ? "Unblock" : "Block"}
                        </a>
                      </td>
                      <td>
                        <a onClick={() => navigate(`/vendor/venues/edit/${turf._id}`)} className="bg-blue-600 text-white cursor-pointer font-medium rounded p-2 hover:bg-blue-700 duration-300">Edit</a>
                      </td>
                    </tr>
                  ))

                ) : (
                  <tr className="text-white">
                    <p>No turfs Available...</p>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default VendorAllVenue;
