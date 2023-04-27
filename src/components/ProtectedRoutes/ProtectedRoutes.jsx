import React from 'react';
import styles from './ProtectedRoutes.module.css'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {
  if(localStorage.getItem("userToken")) {
    return props.children
  } else {
    return <Navigate to='/login'/>
  }
}

export default ProtectedRoutes;
