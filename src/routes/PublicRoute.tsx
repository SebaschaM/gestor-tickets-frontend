// src/routes/PublicRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("accessToken") !== null;

  return isAuthenticated ? (
    <Navigate to="/admin/dashboard/requests" />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
