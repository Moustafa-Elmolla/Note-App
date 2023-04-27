import React from 'react';
import styles from './Layout.module.css'
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <div className='container'>
      <NavBar />
      <Outlet />
    </div>
    </>
  );
}

export default Layout;
