import { lazy } from "react";
import Loadable from "../Loadable";
import AdminLayout from "../../views/Dashboard/index";
import AuthGuard from "../AuthGuard";
const MainLayout = Loadable(lazy(() => import('../../layout/MainLayout/index')));

const AdminRoutes = {
  element: (
    <AuthGuard allowRole="admin">
      <MainLayout/>
    </AuthGuard>
  ),
  children: [
    {
      path: "admin/Dashboard",
      element: <MainLayout/>
    }
  ],
};

export default AdminRoutes;
