import React, { useEffect, useState } from "react";

import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";
import { getUsers, userStatusChange } from "../../services/adminAxios";



function UserManage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admin');
        const { data } = await getUsers()
         setUsers(data.userDatas);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchData();
  }, []);
  

  const handleBlock = async (_id, status) => {
    const confirmResult = await swal({
      title: `${status ? "Unblock user?" : "Block user?"}`,
      text: `Are you sure you want to ${status ? "Unblock" : "Block"} this user?`,
      icon: "warning",
      buttons: ["Cancel", `${status ? "Unblock" : "Block"}`],
      dangerMode: status ? false : true,
    });
  
    if (confirmResult) {
      try {
        
        await userStatusChange({_id})
        setUsers(prevUsers =>
          prevUsers.map(user => (user._id === _id ? { ...user, blockStatus: !user.blockStatus } : user))
        );
  
        toast.success(`User ${status ? "unblocked" : "blocked"} successfully!`);
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  

  return (
    <div className={`px-64 py-4 mt-16 bg-emerald-900 ${users.length ? "h-screen" : "h-screen"} `}>
      <Toaster position="top-right" />
      <div className="p-4 border-gray-200  rounded-lg dark:border-gray-700 mt-14">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-[#D4F1F4] dark:text-blue-100">
            <thead class="text-xs text-[#D4F1F4] uppercase bg-emerald-900 dark:text-white">
              <p className="text-lg m-1 capitalize">Manage Users</p>
              <tr className="border border-emerald-600">
                <th scope="col" class="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  contact information
                </th>
                {/* <th scope="col" class="px-6 py-3">
                  email
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user, key) => (
                  <tr className="bg-emerald-700 border-b border-[#05445E]" id={key}>
                    <th scope="row" className="px-6 py-4 font-medium text-[#D4F1F4] whitespace-nowrap dark:text-[#D4F1F4]">
                      {user.name}
                    </th>
                    <td class="px-6 py-4">{user.mobile ? user.mobile : user.email}</td>
                    <td class="px-6 py-4">
                      <a href="#" onClick={() => handleBlock(user._id, user.blockStatus)} className={`font-medium ${user.blockStatus ? "bg-green-600 " : "bg-red-600"} p-2  `}>
                        {user.blockStatus ? "Unblock" : "Block"}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <div className=" p-4">No users available</div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManage;
