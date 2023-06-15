import React from 'react';
import Quick from './images/quickbook.png';
import MapBased from './images/MapBased.png'
import  EasyPayment from './images/EasyPayment.png'
import MaxiumListing from './images/MaxiumListing.png'
function HomeFeatureContainer() {
  return (
    <div className='bg-green-100 w-full p-12'>
    <div className='text-center'>
    <h2 className="text-black text-4xl font-semibold tracking-wider">SAILENT FEATURES</h2>
    <h2 className="text-slate-800 bg-slate-400 text-xl font-normal tracking-wider mt-5">Go through our various features which separate us from others.</h2>

    </div>
    <div className="bg-green-100 w-full p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
      <div className="shadow-xl scale-100 hover:scale-105">
        <div className="flex">
          <div className="w-1/3">
            <img src={Quick} className="w-50 object-cover h-32  " alt="Card" />
          </div>
          <div className="w-2/3 p-4">
            <h1 className="text-xl font-bold">Quick Booking</h1>
            <h2 className="text-lg">Check availability and book at no extra booking fees! Avail discounts on online transactions.</h2>
          </div>
        </div>
      </div>
      <div className="shadow-xl scale-100 hover:scale-105">
        <div className="flex">
          <div className="w-1/3">
            <img src={MapBased} className="w-50 object-cover h-32" alt="Card" />
          </div>
          <div className="w-2/3 p-4">
            <h1 className="text-xl font-bold">Map based search</h1>
            <h2 className="text-lg">Locate the venue on Gmap look for directions.</h2>
          </div>
        </div>
      </div>
      <div className="shadow-xl scale-100 hover:scale-105">
        <div className="flex">
          <div className="w-1/3">
            <img src={EasyPayment} className="w-50 object-cover h-32" alt="Card" />
          </div>
          <div className="w-2/3 p-4">
            <h1 className="text-xl font-bold">Easy payments</h1>
            <h2 className="text-lg">Multiple payment option like credit card, internet banking, mobile wallet or cash.</h2>
          </div>
        </div>
      </div>
      <div className="shadow-xl scale-100 hover:scale-105">
        <div className="flex">
          <div className="w-1/3">
            <img src={MaxiumListing} className="w-50 object-cover h-32" alt="Card" />
          </div>
          <div className="w-2/3 p-4">
            <h1 className="text-xl font-bold">Maximum Listings</h1>
            <h2 className="text-lg">Easy Access to maximum sports venue and sports events in your city.</h2>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HomeFeatureContainer;
