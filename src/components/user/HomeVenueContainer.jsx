import React from 'react';
import Card from './Card';
import bat from './images/bat.png';
import { IoFootball } from 'react-icons/io5';
import venue from './images/footballpic2-transformed.jpeg';

function HomeVenueContainer() {
  const cardData = [
    {
      imageSrc: venue,
      discount: 5,
      name: 'Name of Turf 1',
      city: 'City 1',
      rating: 4,
      price: 500,
      user1Image: bat,
      user2Image: IoFootball,
    },
    {
        imageSrc: venue,
        discount: 5,
        name: 'Name of Turf 1',
        city: 'City 1',
        rating: 4,
        price: 500,
        user1Image: bat,
        user2Image: IoFootball,
      }, {
        imageSrc: venue,
        discount: 5,
        name: 'Name of Turf 1',
        city: 'City 1',
        rating: 4,
        price: 500,
        user1Image: bat,
        user2Image: IoFootball,
      },{
        imageSrc: venue,
        discount: 5,
        name: 'Name of Turf 1',
        city: 'City 1',
        rating: 4,
        price: 500,
        user1Image: bat,
        user2Image: IoFootball,
      }
  ];

  return (
    <div className="w-full h-100 bg-lime-50 px-6 py-16 ">
    <h2 className="text-black text-4xl font-normal tracking-wider text-center mx-3 mt-3">THE FEATURED SPORTS VENUE</h2>

    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
      {cardData.map((card, index) => (
        <div key={index} className=" m-4">
          <Card {...card} />
        </div>
      ))}
    </div>
    </div>
  );
}

export default HomeVenueContainer;
