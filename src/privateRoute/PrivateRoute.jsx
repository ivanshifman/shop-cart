import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Spinner loading={loading} />;

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
