import React, { useEffect, useState } from "react";
import SingleVenuejsx from "../../components/user/SingleVenue";
import BookingSection from "../../components/user/BookingSection";
import TurfDetailsPart from "../../components/user/TurfDetailsPart";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { getVenue } from "../../services/userAxios";

function SingleVenue() {
  const [turf, setTurf] = useState({});

  const [part, setPart] = useState("bookingSection");

  const { id } = useParams();

  useEffect(() => {
    const getPerTurf = async () => {
      try {
        let  data  = await getVenue(id);
        console.log(data)
        setTurf(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPerTurf();
  }, []);

  return (

   
    <div className="min-h-screen h-auto bg-[#F3F5F9]">
      <SingleVenuejsx turf={turf} part={part} setPart={setPart} />
      {part === "bookingSection" ? <BookingSection turf={turf} /> : <TurfDetailsPart turf={turf} />}
    </div>
  );
}

export default SingleVenue;
