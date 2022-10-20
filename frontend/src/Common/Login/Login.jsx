import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import SIgn_img from '../SIgn_img'

const Login = () => {

  const history = useHistory();
  
  const [adhar, setAdhar] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin , setIsLogin] = useState(false)

  useEffect(()=>{

  },[isLogin])

   const submitForm = (e) =>{
    e.preventDefault()
    const newEntry = {adhar, mobile }
    localStorage.setItem('user-info',  JSON.stringify(newEntry));
    if(true){
      setIsLogin(true)
    }
    history.push('/')
  }

  return (
    <>
<div className="container mt-3">
<section className='d-flex justify-content-between'>
<div className="left_data mt-3 p-3" style={{'width':'30em' }}>
<h3 className='text-center col-lg-6'>Sign IN</h3>
<form action='' onSubmit={submitForm}>
  <div className="form-group">
    <label htmlFor="adharNum">Adhar Number</label>
    <input type="number" className="form-control" id="adharNum" value={adhar} onChange={(e)=> setAdhar(e.target.value)} placeholder="Enter Adhar"/>
  </div>
    <div className="form-group">
    <label htmlFor="mobileNum">Mobile No.</label>
    <input type="number" className="form-control" id="mobileNum" value={mobile} onChange={(e)=> setMobile(e.target.value)} placeholder="Enter Mobile Number"/>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-2">Submit</button>
</form>
<p className='mt-3'>Already Have an Account <span>SignIn</span> </p>
</div>
<SIgn_img />
</section>

</div>
   
    </>
  )
}

export default Login
