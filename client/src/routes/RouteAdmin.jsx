import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { loadAdmin } from "../redux/auth";

function RouteAdmin({ component, path, exact }) {
  //const [isAdmin, setIsAdmin] = useState()
  const dispatch = useDispatch();
  const [isAuthenticated, setLocation] = useState()
  const [userData, setUserData] = useState([])

  const {   isAdmin ,user, loading } = useSelector((state) => state.auth);

  const getUserData = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
        setUserData(res.data)
        console.log(res.data)
         var roleAdmin =res.data.role;
        if(roleAdmin=='admin'){
          console.log(roleAdmin)
          // setIsAdmin(true);
        }
        console.log("sett isamdin true")

    } catch (error) {
        console.log(error)
    }
}; 

useEffect(() => {
 
  dispatch(loadAdmin());
}, []);
  return (
    <>
      {loading  ? (
        <p>loading</p>
      ) :   !isAdmin && !isAuthenticated && !user ? (
        <Redirect to="/login" />
      ) : (
        <Route
          component={component}
          path={path}
          exact={exact}
          key={Date.now()}
        />
      )}
    </>
  );
}

export default RouteAdmin;
