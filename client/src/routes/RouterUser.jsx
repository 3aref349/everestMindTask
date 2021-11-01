import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { loadAdmin, loadUser } from "../redux/auth";
function RouteUser({ component, path, exact }) {
  const dispatch = useDispatch();
  
  const { isAuthenticated , isAdmin, user, loading } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadAdmin());
  }, []);
  return (
    <>
      {loading ? (
        <p>loading</p>
      ) :  !isAuthenticated  && !user ? (
        <Redirect to="/login" />
      ) : (
        <Route
          component={component}
          path={path}
          exact={exact}
          key={Date.now()}
        />
      ) 
      

      }
    </>
  );
}

export default RouteUser;
