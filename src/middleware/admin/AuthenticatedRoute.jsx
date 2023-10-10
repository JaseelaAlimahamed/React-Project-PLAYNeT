import { Navigate } from "react-router-dom";
import { checkIfAdminLoggedIn } from "../../redux/slices/adminSlice";

function AuthenticatedRoute({ children }) {
  if (!checkIfAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default AuthenticatedRoute;