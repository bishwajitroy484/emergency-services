import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import SignUpImage from '../SignUpImage'

const Login = () => {

  const history = useHistory();

  const [useName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errmsg, setErrmsg] = useState('')

  const submitForm = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3001/auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: useName, password: password }),
    });

    const data = await res.json();
    if (res.status === 422 || !data || data.length === 0) {
      setErrmsg('Invalid Username or Password !!')
    } else {
      localStorage.setItem('user-info', JSON.stringify(data[0]));
      history.push('/home')
      window.location.reload(false)
    }
  }

  return (
    <>
      <div className="container mt-3">
        <section className='d-flex justify-content-between'>
          <div className="left_data mt-3 p-3" style={{ 'width': '30em' }}>
            {errmsg && <p style={{ color: 'red', fontWeight: 'initial', fontSize: '16px' }}>{errmsg}</p>}
            <h3>Log In</h3>
            <form action='' onSubmit={submitForm}>
              <div className="form-group">
                <label htmlFor="userName">User Name</label>
                <input type="text" className="form-control" id="userName" value={useName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter userName" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
            <p className='mt-3'>Don't Have an Account? <span><NavLink to="/signup">Sign Up</NavLink></span> </p>
          </div>
          <SignUpImage />
        </section>

      </div>
    </>
  )
}

export default Login
