import axios from "../api/axios"

const GET_TURFS = '/vendor/turfs'

export const getTurfs = async () => {
    const token = localStorage.getItem('vendor');
    try {
        console.log("reached getturfs")
        console.log(token);
        const {data } = await axios.get(GET_TURFS, {
            headers: {
                Authorization: token
            }
        });
       
        return data;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}
export const getSport = async (id) => {
    try {
      const token =  await localStorage.getItem('vendor');
      console.log(token)
      const GET_SPORTS = `/vendor/turf/${id}`; // Use backticks for template literals
      const { data } = await axios.get(GET_SPORTS, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
  


export const getSports = async () => {
    try {
        const token = localStorage.getItem('vendor');
        const GET_SPORTS = "/vendor/sports";
        const { data } = await axios.get(GET_SPORTS, {
            headers: {
                Authorization: token
            }
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};


export const changeBlock = async (id, vendorToken) => {
    try {
        const response = await axios.put(
            "/vendor/turf/block",
            JSON.stringify({ id }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: vendorToken,
                },
             
            }
        );
        return response; // Return the response from the API call if needed
    } catch (err) {
        console.log(err);
        console.log(err.message);
        throw err; // Throw the error to be caught by the caller
    }
};
export const addVenue = async (details) => {
    const token = localStorage.getItem('vendor');
    console.log(details);
    try {
        const response = await axios.post("/vendor/turf/add", details, {
            headers: {
                "Content-Type": "application/json",
                Authorization:token,
            },
          
        });
        return response; // Return the response from the API call if needed
    } catch (err) {
        console.log(err);
        console.log(err.message);
        throw err; // Throw the error to be caught by the caller
    }

}
export const bookingDetails = async () => {

   const Token = localStorage.getItem('vendor');
    
    try {
      
      const response  = await axios.get('/vendor/bookings',{
        headers: {
            "Content-Type": "application/json",
          Authorization:Token,
        },
      });
      console.log(response);
        return response.data; // Return the response from the API call if needed
    } catch (err) {
        console.log(err);
        console.log(err.message);
        throw err; // Throw the error to be caught by the caller
    }

}
export const bookingDetailsCancelled = async () => {

    const Token = localStorage.getItem('vendor');
     
     try {
       
       const response  = await axios.get('/vendor/bookings/cancelled',{
         headers: {
             "Content-Type": "application/json",
           Authorization:Token,
         },
       });
        return response.data; // Return the response from the API call if needed
     } catch (err) {
         console.log(err);
         console.log(err.message);
         throw err; // Throw the error to be caught by the caller
     }
 
 }