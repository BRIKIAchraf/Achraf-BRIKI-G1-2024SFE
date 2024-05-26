import BaseLayout from "../../components/layouts/base";
import PublicGuard from "../PublicGuard";
import NotFound from "../../pages/404";
import Unauthorized from "../../pages/Unauthorized";

const NotFoundRoutes = {
  element: (
    <PublicGuard>
      <BaseLayout />
    </PublicGuard>
  ),
  children: [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
  ],
};

export default NotFoundRoutes;
