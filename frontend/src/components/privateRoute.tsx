
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: any }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;