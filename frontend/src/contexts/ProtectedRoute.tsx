import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({redirectTo, isAllowed }: {redirectTo: string, isAllowed: boolean}) => {

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace/>;
  }
  return  <Outlet />;
}
