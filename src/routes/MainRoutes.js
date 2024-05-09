import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Lazy } from 'yup';


const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

const LeaveManagement = Loadable(lazy(() => import('../views/Conge/LeaveManagement')));

const PlanningManagement = Loadable(lazy(() => import('../views/planning/index')));


const DeviceManagement = Loadable(lazy(() => import('../views/devices/index')));

const DepartmentManagement = Loadable(lazy(() => import('../views/departement/index')));

const AddLeaveForm1 = Loadable(lazy(() => import('../views/Conge/AddLeaveForm')));

const AddPlanning = Loadable(lazy(() => import('../views/addplanning/index')));

//const attendance = Loadable (Lazy(()=> import ('../views/attendances/index')));

const LoginPage = Loadable(lazy(() => import('../views/Login/loginpage')));
// ==============================|| MAIN ROUTES ||============================== //

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/LoginPage" />;
};

const MainRoutes = {
  
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
    },
    {
      path: '/dashboard/default',
      element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
    }, {path: '/LoginPage',
    element: <LoginPage />},

    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/sample-page', element: <ProtectedRoute><SamplePage /></ProtectedRoute> },
    { path: '/LeaveManagement', element: <ProtectedRoute><LeaveManagement/></ProtectedRoute>}, 
    { path: '/PlanningManagement', element:<ProtectedRoute><PlanningManagement/></ProtectedRoute> },
    //{ path: '/AttendanceManagement', element: <AttendanceManagement/> },
    { path: '/DeviceManagement', element: <ProtectedRoute><DeviceManagement/></ProtectedRoute>},
    { path: '/DepartmentManagement', element: <ProtectedRoute><DepartmentManagement/></ProtectedRoute>},
    { path: '/AddLeaveForm1', element: <ProtectedRoute><AddLeaveForm1/></ProtectedRoute>},
    {path: '/leavemanagement/AddLeaveForm1', element: <ProtectedRoute><AddLeaveForm1 /></ProtectedRoute>},
    { path: '/addplanning', element: <ProtectedRoute><AddPlanning /> </ProtectedRoute>}


  ]
};

export default MainRoutes;
