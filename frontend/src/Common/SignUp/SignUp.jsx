import React from 'react'
import { NavLink } from 'react-router-dom'
import './SignUp.css';
import SIgn_img from '../SIgn_img'

export default function SignUp() {
  return (
    <>
    <div className="container mt-3">
    <section className='d-flex justify-content-between'>
    <div className="left_data mt-3 p-3" style={{'width':'30em' }}>
    <h3>Sign Up</h3>
    <form id="signUpForm">
                <div className="form-group">
                    <label htmlFor="firstName">User Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Enter User Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Re-Enter Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Re-Enter Password"/>
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
    <p className='mt-3'>Already Have an Account <span><NavLink to="/login">Log In</NavLink></span> </p>
    </div>
    <SIgn_img />
    </section>
    
    </div>
    
    </>
  )
}

