import { Navigate } from "react-router-dom";
import { checkIfVendorLoggedIn } from "../../redux/slices/vendorSlice";

const UnAuthenticatedRoute = ({children}) => {
  
  if (checkIfVendorLoggedIn()) {
    return <Navigate to='/vendor' replace/>;
  }
  return children;
};

export default UnAuthenticatedRoute;
