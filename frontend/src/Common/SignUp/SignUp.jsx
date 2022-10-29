import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './SignUp.css';
import SignUpImage from '../SignUpImage'
import { useHistory } from "react-router-dom";

export default function SignUp() {
const [fName, setFname] = useState('')
const [lName, setLname] = useState('')
const [uName, setUname] = useState('')
const [pass, setpass] = useState('')
const [rePass, setRePass] = useState('')
const [errorMsg, setErrorMsg] = useState('')
const [errorPassMsg, setErrorPassMsg] = useState('')
const [submitBtn , setSubmitBtn] = useState(true)

const history = useHistory();

useEffect(()=>{
  checkUserEntry();
  mandatoryValidation();
  checkPassword();
},[fName,lName,uName,pass, rePass])

function checkPassword(){
  if(pass != rePass) setErrorPassMsg(`Password Did'nt Match !!!..`);
  else setErrorPassMsg('')
}

async function checkUserEntry(){
  try{
  const res = await fetch(`http://localhost:3001/user/${uName}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  });
  const data = await res.json();

  if(res.status === 201){
    console.log('data.length ', data.length)
    if(data.length !== 0) {setErrorMsg('User Already Exist !!..');}
    else setErrorMsg('')
  }else console.log('API FAILED')
  }catch(e){
    console.log('API ERROR', e)
  }
}

function mandatoryValidation(){
  if(fName && lName && uName && pass && rePass) setSubmitBtn(false)
  else setSubmitBtn(true)
}


const submitSignUpForm = async (e) =>{
  console.log('Submit Button Clicked')
  e.preventDefault()

  const res = await fetch("http://localhost:3001/createuser/", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ fName:fName,lName:lName,username:uName,password:pass }),
  });

  const data = await res.json();
  if (res.status === 422 || !data) {
    console.log("error ");
    alert("error");
} else {
    history.push('/login')
  }
}

  return (
    <>
    <div className="container mt-3">
    <p style={{marginLeft:'10em', fontWeight:'bold', color:'red'}}>{errorMsg}</p>
    <p style={{marginLeft:'10em', fontWeight:'bold', color:'red'}}>{errorPassMsg}</p>

    <section className='d-flex justify-content-between'>
    <div className="left_data p-3" style={{'width':'30em' }}>
    <h3>Sign Up</h3>
    <form id="signUpForm" onSubmit={submitSignUpForm}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" value={fName} onChange={(e)=> setFname(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">last Name</label>
        <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" value={lName} onChange={(e)=> setLname(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="userName">User Name</label>
        <input type="text" className="form-control" id="userName" placeholder="Enter User Name" value={uName} onChange={(e)=> setUname(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" placeholder="Password" value={pass} onChange={(e)=> setpass(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="repassword">Re-Enter Password</label>
        <input type="password" className="form-control" id="repassword" placeholder="Re-Enter Password" value={rePass} onChange={(e)=> setRePass(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary my-2" disabled={submitBtn}>Submit</button>
    </form>
    <p className='mt-3'>Already Have an Account <span><NavLink to="/login">Log In</NavLink></span> </p>
    </div>
    <SignUpImage />
    </section>
    
    </div>
    
    </>
  )
}

