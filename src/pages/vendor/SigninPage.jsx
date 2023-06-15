import React from 'react'
import NavbarWithErrorBoundary from '../../components/user/Navbar'
import Signin from '../../components/vendor/Signin'

function SigninPage() {
  return (
    <div>
        <NavbarWithErrorBoundary/>
        <Signin/>
      
    </div>
  )
}

export default SigninPage
