import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkIfVendorLoggedIn } from '../../redux/slices/vendorSlice';
// import { loginRoute } from '../constants/routes';


const AuthenticatedRoute = ({ children }) => {

  let location = useLocation();

  const vendor = useSelector(state => state.vendor)
console.log(vendor,"nnnnn");
  if (!checkIfVendorLoggedIn()) {
    return <Navigate to='/vendor/signin' replace />;
  } else if (vendor.status === 'rejected' && location.pathname === '/vendor/profile'){
    return children
  } else if (vendor.status === 'approved' && location.pathname !== '/vendor/pending') {
    return <Navigate to='/vendor/pending' replace />;
  }
  return children;
};

export default AuthenticatedRoute;