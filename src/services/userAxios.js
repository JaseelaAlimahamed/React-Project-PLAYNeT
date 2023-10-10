
import axios from "../api/axios"


export const getNewVenues = async () => {
    try {
      const GET_VENUES = '/newVenues';
      const response = await axios.get(GET_VENUES);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };
  export const getVenue = async (venueId) => {
    try {
      const GET_VENUE = `/venue/${venueId}`;
      const response = await axios.get(GET_VENUE);
      
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };
  export const bookSlot = async ({turfId,date}) => {
    try {
        const token = localStorage.getItem("user");
        console.log({turfId,date});
      const BOOK_SLOT = '/bookedSlot';
      const response = await axios.post(BOOK_SLOT,{turfId,date}, {headers: {
        "Content-Type": "application/json",
        Authorization: token,
    }},);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };
  export const userBook = async ( { turf, method, sport, facility, slotDate, slotTime })=>{
  const token = localStorage.getItem("user");
    try {
        console.log( { turf, method, sport, facility, slotDate, slotTime });
      const BOOK_SLOT = '/book';
      const response = await axios.post(BOOK_SLOT,{ turf, method, sport, facility, slotDate, slotTime }, {
          headers: {
            Authorization: token,
          },
        });
      
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling code
    }
}
export const verifyPayment = async (detail)=>{
    const token = localStorage.getItem("user");
    console.log(token);
      try {
          console.log(  detail );
          
        const VERIFY_PAYMENT= '/verifyPayment';
        const response = await axios.post(VERIFY_PAYMENT, detail, {
            headers: {
              Authorization: token,
            },
          });
        
        return response.data;
      } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it in the calling code
      }
  }