import { Navigate ,Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicGuard({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const useUrl = user?.role === "admin" ? "dashboard/default" : "/MainLayout";
    return <Navigate to={useUrl} />;
  }
  //return <Outlet />;
  return <>{children}</>;
}
