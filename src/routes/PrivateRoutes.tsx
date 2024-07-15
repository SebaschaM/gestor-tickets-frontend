// src/routes/PrivateRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoutesPaths } from "./PrivateRoutesPaths";
import { RouterAdminEnum } from "../enum/RouterAdminEnum";
import { AssignRequestEmployeeInternal, AssignRequestHelpDesk } from "../pages";
import PrivateRoute from "./PrivateRoute";

const PrivateRoutes = () => {
  return (
    <Routes>
      {PrivateRoutesPaths.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      <Route path="/admin/assign-request/help-desk" element={<PrivateRoute />}>
        <Route path="" element={<AssignRequestHelpDesk />} />
      </Route>

      <Route path="/admin/assign-request/employee-internal" element={<PrivateRoute />}>
        <Route path="" element={<AssignRequestEmployeeInternal />} />
      </Route>

      <Route path="*" element={<Navigate to={RouterAdminEnum.REQUESTS} />} />
    </Routes>
  );
};

export default PrivateRoutes;
