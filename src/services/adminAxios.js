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

export const getDetails = async ()=>{
   
    const SPORTS_GET = "/admin/sports";
    try {
        const { data } = await axios.get(SPORTS_GET,{headers:{Authorization:token}})
        console.log(data)
        return data; // Return the response data
    } catch (error) {
      throw error; 
      }
};

export const changeStatus = async (facilityData)=>{
    

    const SPORTS_STATUS = "/admin/sports/status"
    try {
        const { response} = await  axios.put(SPORTS_STATUS, facilityData, { headers: { Authorization: token } })

        return response;
    }catch(error){
        console.log(error);
    }
}