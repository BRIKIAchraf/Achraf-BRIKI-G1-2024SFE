import React, { lazy } from 'react';
import BaseLayout from "../components/layouts/base";
import PublicGuard from "../routes/PublicGuard";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import { useAuth0 } from '@auth0/auth0-react';
import AuthGuard from 'routes/AuthGuard';
const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));
const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));
const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));
const LeaveManagement = Loadable(lazy(() => import('../views/Conge/LeaveManagement')));
const PlanningManagement = Loadable(lazy(() => import('../views/planning/index')))
const DeviceManagement = Loadable(lazy(() => import('../views/devices/index')));
const DepartmentManagement = Loadable(lazy(() => import('../views/departement/index')));
const AddLeaveForm1 = Loadable(lazy(() => import('../views/Conge/AddLeaveForm')));
const AddPlanning = Loadable(lazy(() => import('../views/addplanning/index')));

const Attendance = Loadable(lazy(() => import('../views/attendances/index')));
const LoginMethods = Loadable(lazy(() => import('../views/login/index')));
const EmployeeDetails = Loadable(lazy(() => import('../views/SamplePage/EmployeeDetails')));
const LeaveDashboard = Loadable(lazy(() => import('../views/Conge/LeaveDashboard')));
const AddEmployee = Loadable(lazy(() => import('../views/SamplePage/AddEmployee')));
const EditPlanning = Loadable(lazy(() => import('../views/planning/EditPlanning')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  element:<AuthGuard allowRole="admin">
  <MainLayout/>
  </AuthGuard>,
  children: [
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    }, 
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/sample-page', element:<SamplePage />},
    { path: '/LeaveManagement', element: <LeaveManagement/>}, 
    { path: '/PlanningManagement', element:<PlanningManagement/> },
    { path: '/attendance', element: <Attendance />},
    { path: '/DeviceManagement', element: <DeviceManagement/>},
    { path: '/DepartmentManagement', element: <DepartmentManagement/>},
    { path: '/AddLeaveForm1', element: <AddLeaveForm1/>},
    { path: '/addplanning', element: <AddPlanning /> },
    { path: '/LoginMethods', element: <LoginMethods /> },
    { path: '/sample-page/employee-details/:id', element: <EmployeeDetails /> },
    { path: '/leave/details/:leaveId', element: <LeaveDashboard /> },
    {path: '/AddEmployee', element: <AddEmployee />},
    {path: '/edit-planning/:planningId', element: <EditPlanning />}    
  ]
};
export default MainRoutes;
