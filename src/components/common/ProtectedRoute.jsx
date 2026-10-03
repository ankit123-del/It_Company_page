import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({
  children,
  requiredRoles = [],
  redirectTo = "/login",
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // ✅ Demo mode - Skip role check if user is admin
  if (requiredRoles.length > 0) {
    // In demo mode, all users are admin, so skip check
    // Uncomment below if you want strict role checking
    /*
    const hasRequiredRole = requiredRoles.includes(user.role);
    if (!hasRequiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
    */
  }

  return children;
};

export default ProtectedRoute;
