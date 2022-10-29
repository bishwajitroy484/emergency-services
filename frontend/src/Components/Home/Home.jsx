import React, { useState, useEffect } from 'react'
import './Home.css'
import Dropdown from '../../Common/Dropdown/Dropdown'
import Button from '../../Common/Button/Button'
import Timer from '../../Common/StopWatch/Timer'
import { FiPhoneCall } from 'react-icons/fi';
import { MdCallEnd } from 'react-icons/md';
import moment from 'moment'

export default function Home() {

  const [emergencyStatus, setEmergencyStatus] = useState()
  const [callStatus, setCallStatus] = useState()
  const [defaultStatusValue, setDefaultStatusValue] = useState(true)
  const [defaultEmergencyValue, setDefaultEmergencyValue] = useState(true)
  const [isGetCallVisible, setisGetCallVisible] = useState(false)
  const [callStartTime, setCallStartTime] = useState(null)
  const [callEndTime, setCallEndTime] = useState(null)
  const [isDisableAction, setisDisableAction] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [checkUserInfo, setCheckUserInfo] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [mobile, setMobile] = useState('')
  const [endCall, setEndCall] = useState(true)
  const [userDetails, setUserDetails] = useState({ Adhar: '', phone_no: '', city: '', state: '', street: '', pincode: '', house_no: '', emergency: '', callstatus: '', callStart: '', callEnd: '', note: '' })
  const [isFormFieldDisable, setIsFormFieldDisable] = useState(false)
  const [getcallStatus, setGetCallStatus] = useState([]);
  const [getRescueService, setRescueService] = useState([]);
  const [notes, setNotes] = useState('');
  // const [newUserEntry, setNewUserEntry] = useState({adhar:'',phone_no:'',city:'',state:'',pincode:'',house_no:'',street:'',emergency:'',callstatus:'',callStart:'',callEnd:'',note:''});

  const getServices = async () => {

    const res = await fetch(`http://localhost:3001/getservices/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    if (res.status === 422 || !data) console.log("error ");
    else setRescueService(data)
  }

  const getCallStatus = async () => {

    const res = await fetch(`http://localhost:3001/getcallstatus/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (res.status === 422 || !data) console.log("error ");
    else setGetCallStatus(data)
  }

  useEffect(() => {
    getServices();
    getCallStatus();
  }, [])

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    if (emergencyStatus && callStatus && callStatus != 'select' && emergencyStatus != 'select' && time == 0) setisDisableAction(false)
    else setisDisableAction(true)
  }, [callStatus, emergencyStatus, endCall, time])

  const handleStart = () => {
    setIsActive(true);
    setisGetCallVisible(true)
    setDefaultStatusValue(true)
    setDefaultEmergencyValue(true)
    setisDisableAction(true)
    setCallStartTime(moment().format('LTS'))
    setEndCall(false)
  };

  const handleEnd = () => {
    setIsActive(false);
    setTime(0);
    setCallEndTime(moment().format('LTS'))
    setEndCall(true)
  };

  const getAction = async (e) => {
    setDefaultStatusValue(true)
    setDefaultEmergencyValue(true)
    setCallStartTime('')
    setCallEndTime('')
    setShowMsg(false);
    setisGetCallVisible(false)
    setMobile('');
    setEndCall(true)
    setUserDetails({ Adhar: '', phone_no: '', city: '', state: '', street: '', pincode: '', house_no: '', note: '' })
    setCallStatus('select')
    setEmergencyStatus('select')
    setIsFormFieldDisable(false)

    console.log('Submit Form callStartTime => ', callStartTime)
    console.log('Submit Form callEndTime => ', callEndTime)
    console.log('Submit Form emergencyStatus => ', emergencyStatus)
    console.log('Submit Form callStatus => ', callStatus)
    console.log('Submit Form mobile => ', mobile)
    console.log('Submit Form userDetails => ', userDetails)

    // 2 API Call...
    if (checkUserInfo) {
      const locationPatchRes = await fetch(`http://localhost:3001/userlocationupdate/${userDetails.location_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street: userDetails.street, pincode: userDetails.pincode, house_no: userDetails.house_no }),
      });

      const locationId = await locationPatchRes.json();
      if (locationPatchRes.status === 422) {
        alert("Location Update Login Failed error !!...");
      } else {
        const userPatchResponse = await fetch(`http://localhost:3001/usermasterupdate/${mobile}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Adhar: userDetails.Adhar, city_id: 1 }),
        });
        const data = await userPatchResponse.json();
        if (userPatchResponse.status === 422) {
          alert("User Login Failed error !!...");
        } else {
          alert('PATCH SuccessFull Submit !!...', data)
        }
      }


    } else {
      const res1 = await fetch("http://localhost:3001/userlocation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street: userDetails.street, pincode: userDetails.pincode, house_no: userDetails.house_no }),
      });
      const locationId = await res1.json();

      if (res1.status === 422) {
        alert("Login Failed error !!...");
      }
      else {
        let locid = (userDetails.location_id ? userDetails.location_id : locationId)
        const res2 = await fetch("http://localhost:3001/usermaster/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Adhar: userDetails.Adhar, city_id: 1, phone_no: mobile, location_id: locid }),
        });
        const data = await res2.json();

        if (res2.status === 422) {
          alert("Login Failed error !!...");
        } else {
          alert('SuccessFull Submit !!...', data)
        }
      }

    }


  }

  const getEmergencyValue = (value) => { setEmergencyStatus(value); setDefaultEmergencyValue(false) }

  const getStatusValue = (value) => { setCallStatus(value); setDefaultStatusValue(false) }

  const getUserDetailBtn = async () => {

    try {
      const res = await fetch(`http://localhost:3001/userdetails/${mobile}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        alert("Login Failed error !!...");
      } else {
        if (data.length > 0) {
          setCheckUserInfo(true);
          setUserDetails(data[0]);
          setIsFormFieldDisable(true)
        } else {
          setCheckUserInfo(false);
          setUserDetails({ Adhar: '', phone_no: '', city: '', state: '', street: '', pincode: '', house_no: '', note: '' });
          setIsFormFieldDisable(false);
        }
      }
    } catch (e) {
      alert('API ERROR ', e)
    }
    setShowMsg(true);
  }


  return (

    <div className='container-fluid'>

      <div className='row'>
        <div className='col-3'>

          <div className="mt-3">
            <Timer time={time} />
            <button className='btn btn-success btn-sm callButton' type="button" onClick={handleStart}><FiPhoneCall /> Call Received</button>
            <button className='btn btn-danger btn-sm m-2 callButton' type="button" disabled={endCall} onClick={handleEnd} ><MdCallEnd /> Call End</button>
          </div>

          {isGetCallVisible &&
            <div className="input-group input-group-sm mb-3 ml-3" style={{ marginTop: '10px' }}>
              <input type="number" className="form-inline" placeholder='Enter Mobile Number' onChange={(e) => setMobile(e.target.value)} value={mobile} />
              <button className='btn btn-primary' style={{ width: '91px' }} onClick={getUserDetailBtn}>Get Details</button>
            </div>
          }

          {showMsg && <p>{checkUserInfo ? 'User Found' : 'User Not Found'}</p>}
        </div>

        <div className='col-5 mt-3'>
          <h3 style={{ textAlign: 'center' }}>User Information</h3>

          <form>
            <div className="form-group row my-2">
              <label htmlFor="phoneNum" className="col-sm-4 col-form-label">Phone Number</label>
              <div className="col-sm-7">
                <input type="number" className="form-control" id="phoneNum" placeholder="Phone Number" value={mobile} disabled={isFormFieldDisable} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="adhar" className="col-sm-4 col-form-label">Adhar Number</label>
              <div className="col-sm-7">
                <input type="number" className="form-control" id="adhar" placeholder="Adhar Number" onChange={(e) => setUserDetails({ ...userDetails, Adhar: e.target.value })} value={userDetails.Adhar} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="houseNum" className="col-sm-4 col-form-label">House No.</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="houseNum" placeholder="House Number" onChange={(e) => setUserDetails({ ...userDetails, house_no: e.target.value })} value={userDetails.house_no} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="streeName" className="col-sm-4 col-form-label">Steer Name</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="streeName" placeholder="Street Name" onChange={(e) => setUserDetails({ ...userDetails, street: e.target.value })} value={userDetails.street} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="cityName" className="col-sm-4 col-form-label">City</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="cityName" placeholder="City" onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })} value={userDetails.city} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="pincode" className="col-sm-4 col-form-label">Pin Code</label>
              <div className="col-sm-7">
                <input type="number" className="form-control" id="pincode" placeholder="Pin Code" onChange={(e) => setUserDetails({ ...userDetails, pincode: e.target.value })} value={userDetails.pincode} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="pincode" className="col-sm-4 col-form-label">Emergency Required</label>
              <div className="col-sm-7">
                <Dropdown options={getRescueService} dropdownHandel={getEmergencyValue} defaultvalue={defaultEmergencyValue} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="notes" className="col-sm-4 col-form-label">Notes</label>
              <div className="col-sm-7">
                <textarea className="form-control" id="notes" rows="3" placeholder="Note" onChange={(e) => setUserDetails({ ...userDetails, note: e.target.value })} value={userDetails.note}></textarea>
                {/* <input type="text" className="form-control" id="notes" placeholder="Note"/> */}
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="pincode" className="col-sm-4 col-form-label">Call Status</label>
              <div className="col-sm-7">
                <Dropdown options={getcallStatus} dropdownHandel={getStatusValue} defaultvalue={defaultStatusValue} />
              </div>
            </div>
            <Button name={"Submit"} btnAction={getAction} isDisable={isDisableAction} />
          </form>

        </div>

        <div className='col-4 mt-5'>
          <form>
            <div className="form-group row my-2">
              <label htmlFor="startTime" className="col-sm-3 col-form-label">Start Time :</label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control" id="startTime" disabled value={callStartTime} />
              </div>
            </div>
            <div className="form-group row my-2">
              <label htmlFor="endTime" className="col-sm-3 col-form-label">End Time :</label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control" id="endTime" disabled value={callEndTime} />
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}