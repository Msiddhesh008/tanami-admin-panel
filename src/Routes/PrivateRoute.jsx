import React, { useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import GlobalStateContext from '../Contexts/GlobalStateContext';


const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
const { isAuthenticate } = useContext(GlobalStateContext);
const isAuthenticatedInCookie = Cookies.get("isAuthenticated");


  if (!isAuthenticate && isAuthenticatedInCookie !== "true") {
    return navigate('/login');
  }
  return children;
};

export default PrivateRoute;