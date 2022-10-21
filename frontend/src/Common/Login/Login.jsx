import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import SIgn_img from '../SIgn_img'

const Login = () => {

  const history = useHistory();
  
  const [useName, setUserName] = useState('')
  const [password, setPassword] = useState('')

   const submitForm = (e) =>{
    e.preventDefault()
    const newEntry = {useName, password }
    localStorage.setItem('user-info',  JSON.stringify(newEntry));
    history.push('/home')
  }

  return (
    <>
<div className="container mt-3">
<section className='d-flex justify-content-between'>
<div className="left_data mt-3 p-3" style={{'width':'30em' }}>
<h3>Log In</h3>
<form action='' onSubmit={submitForm}>
  <div className="form-group">
    <label htmlFor="userName">User Name</label>
    <input type="text" className="form-control" id="userName" value={useName} onChange={(e)=> setUserName(e.target.value)} placeholder="Enter userName"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-2">Submit</button>
</form>
<p className='mt-3'>Don't Have an Account <span><NavLink to="/signup">Sign Up</NavLink></span> </p>
</div>
<SIgn_img />
</section>

</div>
   
    </>
  )
}

export default Login
