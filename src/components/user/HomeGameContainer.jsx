import React from 'react'

import Game from './images/Games.png'


function HomeGameContainer() {
  return (
<div className="bg-emerald-950 opacity-80 w-full grid grid-cols-1 lg:grid-cols-2 p-12">

  <div className="relative">
    <img src={Game} className="w-50 h-auto my-16 object-cover" alt="Game" />
  </div>
  <div className="relative text-center py-24  bg-black w-full h-auto object-cover my-20 lg:my-0">
    <h2 className="text-white text-5xl font-bold tracking-wider mt-12">Enjoy Your Game</h2>
    <h3 className="text-white text-3xl font-normal tracking-wider mt-12">
      You and your friends can <br />have a great time playing sports <br />on sportturf, enjoying its <br />performance-enhancing features and<br /> the thrill of the game in a safe and<br /> inviting environment.
    </h3>
  </div>
 
</div>


  )
}

export default HomeGameContainer
