// src/routes/PrivateRoutesPaths.tsx
import React from "react";
import { RouterAdminEnum } from "../enum/RouterAdminEnum";
import { DashboardRequestManager } from "../pages";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

interface IRoute {
  path: string;
  role: string[];
  label: string;
  showInSidebar: boolean;
  icon: React.ComponentType;
  component: React.ComponentType;
  subRoutes?: { path: string; label: string }[];
}

export const PrivateRoutesPaths: IRoute[] = [
  {
    path: RouterAdminEnum.REQUESTS,
    role: ["admin"],
    label: "Solicitudes",
    showInSidebar: true,
    icon: VscGitPullRequestNewChanges,
    component: () => <DashboardRequestManager />,
  },
];
