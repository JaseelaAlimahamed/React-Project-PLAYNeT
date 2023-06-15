import React from 'react'
import Signup from '../../components/vendor/Signup'
import NavbarWithErrorBoundary from '../../components/user/Navbar';


function SignupPage() {
  return (
    <div>
      <NavbarWithErrorBoundary/>
      <Signup/>
    </div>
  )
}

export default SignupPage;
