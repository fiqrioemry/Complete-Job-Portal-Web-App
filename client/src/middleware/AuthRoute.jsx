import { Navigate, useLocation } from "react-router-dom";
import { useGlobal } from "../context/GlobalProvider";
import { AuthPath, NonAuthPath } from "../config";
import { Fragment } from "react";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useGlobal();

  //   if (!user && AuthPath.includes(location.pathname))
  //     return <Navigate to="/signin" replace />;

  if (user && NonAuthPath.includes(location.pathname))
    return <Navigate to="/" replace />;

  return <Fragment>{children}</Fragment>;
};

export default AuthRoute;
