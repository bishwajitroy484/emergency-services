import React from 'react'
import './SignUp.css';

export default function SignUp() {
  return (
    <>
    <div className='container my-5 mb-5' style={{'width':'30em'}}>
        <div>
            <h1 className='text-center'>Sign Up</h1>
        </div>
        <div>
            <form id="signUpForm">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Enter First Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="adharNum">Adhar No.</label>
                    <input type="number" className="form-control" id="lastName" placeholder="Enter Adhar No"/>
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNum">Mobile No.</label>
                    <input type="number" className="form-control" id="mobileNum" placeholder="Enter Mobile No"/>
                </div>

                <div className="form-group">
                    <label htmlFor="houseNum">House No.</label>
                    <input type="number" className="form-control" id="houseNum" placeholder="Enter House No"/>
                </div>

                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" id="street" placeholder="Enter Street Name"/>
                </div>

                <div className="form-group">
                    <label htmlFor="pinCode">Pin Code</label>
                    <input type="text" className="form-control" id="pincode" placeholder="Enter Pin code"/>
                </div>


                <div className="row">
                    <div className="col">
                    <label htmlFor="city">City</label>
                      <input type="text" className="form-control" id="city" placeholder="Enter City"/>
                    </div>
                <div className="col">
                    <label htmlFor="state">State</label>
                      <input type="text" className="form-control" id="state" placeholder="Enter State"/>
                </div>
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
        </div>
    </div> 
    </>
  )
}
