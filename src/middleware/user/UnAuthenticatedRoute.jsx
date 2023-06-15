import { Navigate} from "react-router-dom";
// import { useSelector } from "react-redux";
import { checkIfUserLoggedIn } from "../../redux/userSlice";


const UnAuthenticatedRoute = ({children}) => {

 
  if (checkIfUserLoggedIn()) {

    return <Navigate to='/' replace/>;
  }
  return children;
};

export default UnAuthenticatedRoute;