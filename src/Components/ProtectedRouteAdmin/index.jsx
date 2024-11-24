/* eslint-disable react/prop-types */
import { Navigate } from "react-router"
import {useSelector } from "react-redux"

export const ProtectedRouteForAdmin = ({children}) => {
    const { user } = useSelector((state) => state.auth);
  
    // const user = JSON.parse(localStorage.getItem('users'))
    if (user?.role === "admin") {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}