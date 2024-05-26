import React, { lazy } from 'react';
import Loadable from 'component/Loadable';
import BaseLayout from "../../components/layouts/base/index";
import PublicGuard from "../PublicGuard";

const Login = Loadable(lazy(() => import('../../pages/auth/Login')));
const Signup = Loadable(lazy(() => import('../../pages/auth/Signup')));

const PublicRoutes = {
  path: '/',
  element: 
    <PublicGuard>
      <BaseLayout />
    </PublicGuard>
  ,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: (
        <PublicGuard>
          <Signup />
        </PublicGuard>
      ),
    },
  ],
};

export default PublicRoutes;
