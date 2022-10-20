import React, { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'

export default function Header() {

  const [userLogin , setUserLogin] = useState(false)
  
  useEffect(()=>{
    const userLogininfo = localStorage.getItem('user-info');
    if(userLogininfo){
      setUserLogin(true)
    }else{
      setUserLogin(false)
    }

  },[userLogin,setUserLogin])

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
      <NavLink  className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
      <NavLink  className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
      <NavLink  className="nav-link" to="/profile">Profile</NavLink>
      </li>
      <li className="nav-item">
      <NavLink  className="nav-link" to="/service">Service</NavLink>
      </li>
      {!userLogin ?      <><li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li><li className="nav-item">
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
              </li></> : <li className="nav-item">
      <NavLink  className="nav-link" to="/login" onClick={localStorage.removeItem("user-info")}>Logout</NavLink>
      </li>}
    </ul>
  </div>
</nav>
    </>
  )
}
