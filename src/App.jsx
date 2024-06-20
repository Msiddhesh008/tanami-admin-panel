import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css"; // Import CSS file
import DefaultLayout from "./Layout/DefaultLayout";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import GlobalStateContext from "./Contexts/GlobalStateContext";
import Cookies from "js-cookie";
import NoInternetScreen from "./Pages/NoInternetScreen";

const App = () => {
  // const { isAuthenticate } = useSelector((state) => state?.auth);

  const { isAuthenticate } = useContext(GlobalStateContext);
  const isAuthenticatedInCookie = Cookies.get("isAuthenticated");
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  const PrivateRoute = ({ children }) => {
    if (!isAuthenticate && isAuthenticatedInCookie !== "true") {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            isOnline ? (
              isAuthenticate || isAuthenticatedInCookie === "true" ? (
                <DefaultLayout />
              ) : (
                <Login />
              )
            ) : (
              <NoInternetScreen />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
