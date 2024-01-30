import axios from "../api/axios";

const token = localStorage.getItem('admin');


export const addSport = async (facility, sport) => {
  const ADDSPORT_URL = '/admin/sports/add'; // Replace with the actual signup URL

  try {
    const { data } = await axios.post(ADDSPORT_URL, { sport, facility }, {
      headers: { Authorization: token }
    });

    return data; // Return the response data
  } catch (error) {

    throw error;
  }
};

export const getDetails = async () => {

  const SPORTS_GET = "/admin/sports";
  try {
    const { data } = await axios.get(SPORTS_GET, { headers: { Authorization: token } })
    console.log(data)
    return data; // Return the response data
  } catch (error) {
    throw error;
  }
};

export const changeStatus = async (facilityData) => {


  const SPORTS_STATUS = "/admin/sports/status"
  try {
    const { response } = await axios.put(SPORTS_STATUS, facilityData, { headers: { Authorization: token } })

    return response;
  } catch (error) {
    console.log(error);
  }
}
export const getVendors = async () => {

  try {
    const response  = await axios.get("/admin/vendor", { headers: { Authorization: token } })

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const changeBlock = async (_id) => {
try {
  const CHANGE_BLOCK = "/admin/vendor/blockStatus";

  const response = await axios.put(CHANGE_BLOCK, { _id }, { headers: { Authorization: token } });

  return response;
}catch(error){
  console.log(error);

}
}
export const vendorStatus=async (vmId, status, reason)=>{
  try{
    let { data } = await axios.put(
      "/admin/vendor/status",
      { vmId, status, reason },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }catch(error){
    console.log(error);
  }
}
export const getUsers = async () => {
  const GET_USERS = "/admin/users";
  try {
    const response = await axios.get(GET_USERS, { headers: { Authorization: token } });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export const userStatusChange = async ({_id}) => {
  const CHANGE_BLOCK = "/admin/users/blockStatus";

  try {
    const response = await axios.put(CHANGE_BLOCK, { _id }, { headers: { Authorization: token } });
    return response;
  } catch (error) {
    console.log(error);
  }
}

