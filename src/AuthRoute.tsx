import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const token = localStorage.getItem("authToken");

  // If not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/AdminLogin" replace />;
  }

  // Render the protected route
  return <Outlet />;
};

export default AuthRoute;
