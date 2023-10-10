import React from 'react'
import SidebarAdmin from '../../components/admin/SidebarAdmin'
import SportsFeature from '../../components/admin/SportsFeatures'

function VenueFeaturesPage() {
  return (
    <div>
      
      <div className='flex justify-between'>
      <SidebarAdmin/>
      <SportsFeature />
      </div>
    </div>
  )
}

export default VenueFeaturesPage
