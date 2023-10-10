import React from 'react'
import Navbar from '../../components/user/Navbar'
import HomeSearchContainer from '../../components/user/HomeSearchContainer'
import HomeVenueContainer from '../../components/user/HomeVenueContainer'
import HomeGameContainer from '../../components/user/HomeGameContainer'
import HomeFeatureContainer from '../../components/user/HomeFeatureContainer'
import Footer from '../../components/user/Footer'

function Home() {
    return (
        <div>
            
            <HomeSearchContainer />
            <HomeVenueContainer/>
            <HomeGameContainer/>
            <HomeFeatureContainer/>
            
        </div>
    )
}

export default Home
