// src/routes/AppRouter.tsx
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ToastProvider from "../providers/ToastProvider";
import { AssignRequestEmployeeInternal, AssignRequestHelpDesk, Login } from "../pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>

        <Route path="/admin/dashboard/*" element={<PrivateRoute />}>
          <Route path="*" element={<PrivateRoutes />} />
        </Route>

        <Route path="/admin/assign-request/help-desk" element={<PrivateRoute />}>
          <Route path="" element={<AssignRequestHelpDesk />} />
        </Route>

        <Route path="/admin/assign-request/employee-internal" element={<PrivateRoute />}>
          <Route path="" element={<AssignRequestEmployeeInternal />} />
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
