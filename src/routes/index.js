import { useRoutes } from 'react-router-dom';
//import BaseLayout from "../components/layouts/base";
import PublicRoutes from "../routes/paths/PublicRoutes"
// routes
//import MainRoutes from './MainRoutes';
import AdminRoutes from '../routes/paths/AdminRoutes';
import MainRoutes from './MainRoutes';
import NotFoundRoutes from '../routes/paths/NotFoundRoute';

// ==============================|| ROUTING RENDER ||============================== //
export default function ThemeRoutes() {
  return useRoutes([PublicRoutes,AdminRoutes,MainRoutes,NotFoundRoutes]);
}
