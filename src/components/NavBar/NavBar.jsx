import React from 'react';
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  let userToken = localStorage.getItem('userToken')
  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem("userToken")
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="home">Notes App</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userToken ? <li className="nav-item">
          <a className="nav-link cursor_pointer" to="logout" onClick={logout}>Logout</a> 
        </li>:<>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>

        </>}
        
        
      </ul>
    </div>
  </div>
</nav>
    </>
  );
}

export default NavBar;
