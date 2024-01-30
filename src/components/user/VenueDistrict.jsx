import React, { useEffect, useState } from 'react';
import Card from './Card';
import sorryIcon from './images/sadsory.png'
import { getDistrictVenues } from '../../services/userAxios';
import { Link} from "react-router-dom";



function VenueDistrict(district) {
  const [venues, setVenues] = useState([]);
  const dist = district.district


  useEffect(() => {
    const fetchVenues = async () => {
      try {
        console.log(dist);

        const data = await getDistrictVenues(dist);
        console.log(data);
        setVenues(data)

      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVenues();

  }, [district]);


  return (
    <div>
      {venues.length ? (
        <div className="w-full h-100 bg-lime-50 px-6 py-16 ">

          <h2 className="text-black text-4xl font-normal tracking-wider text-center mx-3 mt-3">The Nearest Sports Venues In {`${dist}`} </h2>

          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
            {venues.map((venue, index) => (
              <div key={index} className=" m-4">
                <Card {...venue} />
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="w-full h-full bg-lime-50 flex flex-col items-center justify-center">
      <img src={sorryIcon} width="200" height="200" className="mt-32 mb-10" alt="..." />
        <h2 className="text-black text-4xl font-normal tracking-wider text-center  mb-16">
          There is NO Sports Venues In {`${dist}`} we will reach you soon
        </h2>
        <Link to="/"><h2 className="border-b border-black-100 py-2">HOME</h2></Link>
      </div>
      
        )}
        </div>
  )
}

export default VenueDistrict
