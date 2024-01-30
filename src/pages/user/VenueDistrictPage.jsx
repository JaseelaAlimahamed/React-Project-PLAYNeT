import React from 'react'
import { useParams } from "react-router-dom";

import VenueDistrict from '../../components/user/VenueDistrict'

function VenueDistrictPage() {
    const {dist}=useParams()
     console.log(dist)
  return (
    <div>
      <VenueDistrict district={dist}/>
    </div>
  )
}

export default VenueDistrictPage
