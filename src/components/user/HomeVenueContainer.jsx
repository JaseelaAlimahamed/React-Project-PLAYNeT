import React, { useEffect,useState } from 'react';
import Card from './Card';
import bat from './images/bat.png';
import { IoFootball } from 'react-icons/io5';
import venue from './images/footballpic2-transformed.jpeg';
import { getNewVenues } from '../../services/userAxios';

function HomeVenueContainer() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getNewVenues();
        console.log(data);
        setVenues(data)

      } catch (error) {
        console.log(error.message);
      }
    };
    fetchVenues();

  }, []);


  return (
    <div className="w-full h-100 bg-lime-50 px-6 py-16 ">
      <h2 className="text-black text-4xl font-normal tracking-wider text-center mx-3 mt-3">THE FEATURED SPORTS VENUE</h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {venues.map((venue, index) => (
          <div key={index} className=" m-4">
            <Card {...venue} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeVenueContainer;
