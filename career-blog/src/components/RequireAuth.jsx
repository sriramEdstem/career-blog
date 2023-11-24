import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const auth = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const location = useLocation();

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : auth ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
