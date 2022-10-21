import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'

export default function Header() {

  const userLogininfo = localStorage.getItem('user-info');
  const [isLogin, setIsLogin] = useState(userLogininfo);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(null);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
         <li className="nav-item">
          <NavLink  className="nav-link" to="/home">Home</NavLink>
         </li>
         <li className="nav-item">
          <NavLink  className="nav-link" to="/service">Service</NavLink>
         </li>
        {!isLogin ?      <><li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li><li className="nav-item">
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
              </li></> : <li className="nav-item">
      <NavLink  className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
      </li>}
    </ul>
  </div>
</nav>
    </>
  )
}
