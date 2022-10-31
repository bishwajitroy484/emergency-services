import React, { useState, useEffect } from 'react'
import './Home.css'
import Dropdown from '../../Common/Dropdown/Dropdown'
import Button from '../../Common/Button/Button'
import Timer from '../../Common/StopWatch/Timer'
import { FiPhoneCall } from 'react-icons/fi';
import { MdCallEnd } from 'react-icons/md';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Autocomplete from '../../Common/AutoComplete/Autocomplete'

export default function Home() {

  const [emergencyStatus, setEmergencyStatus] = useState()
  const [callStatus, setCallStatus] = useState()
  const [defaultStatusValue, setDefaultStatusValue] = useState(true)
  const [defaultEmergencyValue, setDefaultEmergencyValue] = useState(true)
  const [isGetCallVisible, setIsGetCallVisible] = useState(false)
  const [callStartTime, setCallStartTime] = useState(null)
  const [callEndTime, setCallEndTime] = useState(null)
  const [isDisableAction, setIsDisableAction] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [checkUserInfo, setCheckUserInfo] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [mobile, setMobile] = useState('')
  const [endCall, setEndCall] = useState(true)
  const [startCall, setStartCall] = useState(true)
  const [userDetails, setUserDetails] = useState({ Adhar: '', phone_no: '', city: '', state: '', street: '', pincode: '', house_no: '', emergency: '', callstatus: '', callStart: '', callEnd: '', note: '', emergencyLocation: '' })
  const [isFormFieldDisable, setIsFormFieldDisable] = useState(false)
  const [getcallStatus, setGetCallStatus] = useState([]);
  const [getRescueService, setRescueService] = useState([]);
  const [getCity, setGetCity] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [validateMobileNum, setValidateMobileNum] = useState(false);
  const [cityVal, setCityVal] = useState('')
  const userLogininfo = localStorage.getItem('user-info');

  const getServices = async () => {
    const getAllRescueServices = await fetch(`http://localhost:3001/getservices/`, { method: "GET", headers: { "Content-Type": "application/json" } });
    const receivedData = await getAllRescueServices.json();
    if (getAllRescueServices.status === 422 || !receivedData) console.log("ERROR IN RETRIEVING RESCUE SERVICES");
    else setRescueService(receivedData)
  }
  const getCallStatus = async () => {
    const getAllCallStatus = await fetch(`http://localhost:3001/getcallstatus/`, { method: "GET", headers: { "Content-Type": "application/json" } });
    const receivedData = await getAllCallStatus.json();
    if (getAllCallStatus.status === 422 || !receivedData) console.log("ERROR IN RETRIEVING CALL STATUS");
    else setGetCallStatus(receivedData)
  }
  const getCityData = async () => {
    const getAllCity = await fetch(`http://localhost:3001/getcity/`, { method: "GET", headers: { "Content-Type": "application/json" } });
    const receivedData = await getAllCity.json();
    if (getAllCity.status === 422 || !receivedData) console.log("ERROR IN RETRIEVING CITY");
    else setGetCity(receivedData)
  }
  useEffect(() => {
    const mobileNumValidate = () => {
      if (mobile) {
        if (mobile.toString().length === 10) setValidateMobileNum(false)
        else setValidateMobileNum(true)
      }
    }
    mobileNumValidate();
  }, [mobile])

  useEffect(() => {
    getServices();
    getCallStatus();
    getCityData();
    if (userLogininfo) {
      setStartCall(false);
      setAlertMsg('');
    } else {
      setAlertMsg('You have not login into the system to start receiving calls !!..')
    }
  }, [userLogininfo])

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else { clearInterval(interval); }
    return () => { clearInterval(interval); };
  }, [isActive]);

  useEffect(() => {
    if (emergencyStatus && callStatus && callStatus !== 'select' && emergencyStatus !== 'select' && time === 0) setIsDisableAction(false)
    else setIsDisableAction(true)
  }, [callStatus, emergencyStatus, endCall, time])

  const handleStart = () => {
    setIsActive(true);
    setIsGetCallVisible(true)
    setDefaultStatusValue(true)
    setDefaultEmergencyValue(true)
    setIsDisableAction(true)
    setCallStartTime(moment().format("YYYY-MM-DD HH:mm:ss"))
    setEndCall(false)
  };

  const handleEnd = () => {
    setIsActive(false);
    setTime(0);
    setCallEndTime(moment().format("YYYY-MM-DD HH:mm:ss"))
    setEndCall(true)
  };

  const getAction = async (e) => {
    setDefaultStatusValue(true)
    setDefaultEmergencyValue(true)
    setCallStartTime('')
    setCallEndTime('')
    setShowMsg(false);
    setIsGetCallVisible(false)
    setMobile('');
    setEndCall(true)
    setUserDetails({ Adhar: '', phone_no: '', city: '', state: '', street: '', pincode: '', house_no: '', note: '', emergencyLocation: '' })
    setCallStatus('select')
    setEmergencyStatus('select')
    setIsFormFieldDisable(false)

    //If the We get the User in DB then we have to perform PATCH Call to Update the Data if there is a change
    if (checkUserInfo) {
      console.log('INSIDE THE PATCH CALL - UPDATE API ')
      const locationPatchRes = await fetch(`http://localhost:3001/userlocationupdate/${userDetails.location_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street: userDetails.street, pincode: userDetails.pincode, house_no: userDetails.house_no }),
      });
      const receivedlocationPatchRes = await locationPatchRes.json();

      if (locationPatchRes.status === 422) {
        console.log(`API FAILED TO UPDATE THE USER INFO IN "location_master" TABLE `);
        toast.error('location_master API FAILED')
      } else {
        console.log(`API SUCCESSFULLY UPDATE THE USER INFO IN "location_master" TABLE `, receivedlocationPatchRes);
        const userPatchResponse = await fetch(`http://localhost:3001/usermasterupdate/${mobile}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Adhar: userDetails.Adhar, city_id: 1 }),
        });
        const receiveduserPatchResponse = await userPatchResponse.json();
        if (userPatchResponse.status === 422) {
          console.log(`API FAILED TO UPDATE THE USER INFO IN "user_master" TABLE `);
          toast.error('user_master API FAILED')
        } else {
          console.log(`API SUCCESSFULLY UPDATE THE USER INFO IN "user_master" TABLE `, receiveduserPatchResponse);
        }
      }
    } else {
      //Else we have to create a new entry
      console.log('INSIDE THE POST CALL - CREATE API ')
      const locationPostRes = await fetch("http://localhost:3001/userlocation/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ street: userDetails.street, pincode: userDetails.pincode, house_no: userDetails.house_no }),
      });
      const receivedlocationPostRes = await locationPostRes.json();

      if (locationPostRes.status === 422) {
        console.log(`API FAILED TO CREATE THE USER INFO IN "location_master" TABLE `);
        toast.error('location_master API FAILED')

      } else {
        console.log(`API SUCCESSFULLY CREATE THE USER INFO IN "location_master" TABLE`, receivedlocationPostRes)
        const locationID = (userDetails.location_id ? userDetails.location_id : receivedlocationPostRes);
        const userPostResponse = await fetch("http://localhost:3001/usermaster/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Adhar: userDetails.Adhar, city_id: cityVal, phone_no: mobile, location_id: locationID }),
        });

        const receiveduserPostResponse = await userPostResponse.json();
        if (receiveduserPostResponse.status === 422) {
          console.log(`API FAILED TO CREATE THE USER INFO IN "user_master" TABLE `);
          toast.error('user_master API FAILED');
        } else {
          console.log(`API SUCCESSFULLY CREATE THE USER INFO IN "user_master" TABLE`, receiveduserPostResponse)
        }
      }

    }
    //Call Info Update....
    const operatorId = JSON.parse(userLogininfo)
    const callInfo = await fetch("http://localhost:3001/callinfo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: userDetails.note, phone_number: mobile, call_status_id: callStatus, call_start_time: callStartTime, call_end_time: callEndTime, operator_id: operatorId.operator_id }),
    });
    const callInfoId = await callInfo.json();

    if (callInfo.status === 422) {
      console.log(`API FAILED TO CREATE THE USER INFO IN "call_info_master" TABLE `);
      toast.error('call_info_master API FAILED');

    } else {
      console.log(`API SUCCESSFULLY CREATE THE USER INFO IN "call_info_master" TABLE`, callInfo)
      const alertMaker = await fetch("http://localhost:3001/alertmaker/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call_id: callInfoId, action_id: emergencyStatus }),
      });
      const alertMakerData = await alertMaker.json();

      if (callInfo.status === 422) {
        console.log(`API FAILED TO CREATE THE USER INFO IN "alert_maker_master" TABLE `);
        toast.error('alert_maker_master API FAILED');
      } else {
        console.log(`API SUCCESSFULLY CREATE THE USER INFO IN "alert_maker_master" TABLE `, alertMakerData)
      }
    }
    toast.success('Call Ended. Emergency Service has been initiated. Sms has been sent to the caller Mobile no.')
  }

  const getEmergencyValue = (value) => { setEmergencyStatus(value); setDefaultEmergencyValue(false) }

  const getStatusValue = (value) => { setCallStatus(value); setDefaultStatusValue(false) }

  const getCityValue = (value) => { setCityVal(value.id); console.log('Vikcy ', value) }

  const getUserDetailBtn = async () => {

    if (!validateMobileNum) {
      try {
        const checkUserExist = await fetch(`http://localhost:3001/userdetails/${mobile}`, { method: "GET", headers: { "Content-Type": "application/json" } });
        const receivedData = await checkUserExist.json();
        if (checkUserExist.status === 422 || !receivedData) {
          console.log("API FAILED TO FETCH USER DETAILS");
        } else {
          if (receivedData.length > 0) {
            console.log("API GET USER DETAILS IN DB");
            setCheckUserInfo(true);
            setUserDetails(receivedData[0]);
            setIsFormFieldDisable(true)
          } else {
            console.log("API DID NOT GET USER DETAILS IN DB");
            setCheckUserInfo(false);
            setUserDetails({ Adhar: '', phone_no: '', city: '', state: '', street: '', pincode: '', house_no: '', note: '' });
            setIsFormFieldDisable(false);
          }
        }
      } catch (e) {
        alert('API "userdetails" ERROR ', e)
      }
      setShowMsg(true);
    }
  }

  return (
    <div className='container-fluid' style={{ height: '110vh' }}>

      <div className='row'>
        <div className='col-3'>

          <div className="mt-3">
            {startCall && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>{alertMsg}</p>}
            <Timer time={time} />
            <button className='btn btn-success btn-sm callButton' type="button" disabled={startCall} onClick={handleStart}><FiPhoneCall /> Call Received</button>
            <button className='btn btn-danger btn-sm m-2 callButton' type="button" disabled={endCall} onClick={handleEnd} ><MdCallEnd /> Call End</button>
          </div>

          {isGetCallVisible &&
            <div className="input-group input-group-sm mb-3 ml-3" style={{ marginTop: '10px' }}>
              <input type="number" className="form-inline" placeholder='Enter Mobile Number' onChange={(e) => setMobile(e.target.value)} value={mobile} />
              <button className='btn btn-primary' style={{ width: '91px' }} onClick={getUserDetailBtn} disabled={validateMobileNum}>Get Details</button>
            </div>
          }
          {showMsg && <p className={checkUserInfo ? 'userFound' : 'userNotFound'}>{checkUserInfo ? 'User Found !!' : 'User Not Found'}</p>}
          {validateMobileNum && <p className='userNotFound'>Enter 10 Digits Valid Mobile Number</p>}
        </div>

        <div className='col-5 mt-3'>
          <h3 style={{ textAlign: 'center' }}>User Information</h3>
          <div style={{ marginTop: '2em', marginBottom: '5em' }}>
            <form>
              <div className="form-group row my-2">
                <label htmlFor="phoneNum" className="col-sm-4 col-form-label">Phone Number</label>
                <div className="col-sm-7">
                  <input type="number" className="form-control" id="phoneNum" placeholder="Phone Number" disabled={true} value={mobile} />
                </div>
              </div>
              <div className="form-group row my-2">
                <label htmlFor="adhar" className="col-sm-4 col-form-label">Aadhar Number</label>
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
                <label htmlFor="streeName" className="col-sm-4 col-form-label">Street Name</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" id="streeName" placeholder="Street Name" onChange={(e) => setUserDetails({ ...userDetails, street: e.target.value })} value={userDetails.street} />
                </div>
              </div>
              <div className="form-group row my-2">
                <label htmlFor="cityName" className="col-sm-4 col-form-label">City</label>
                <div className="col-sm-7">
                  <Autocomplete autoCompleteHandel={getCityValue} options={getCity} />
                  {/* <input type="text" className="form-control" id="cityName" placeholder="City" onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })} value={userDetails.city} /> */}
                </div>
              </div>
              <div className="form-group row my-2">
                <label htmlFor="pincode" className="col-sm-4 col-form-label">Pin Code</label>
                <div className="col-sm-7">
                  <input type="number" className="form-control" id="pincode" placeholder="Pin Code" onChange={(e) => setUserDetails({ ...userDetails, pincode: e.target.value })} value={userDetails.pincode} />
                </div>
              </div>
              <div className="form-group row my-2">
                <label htmlFor="pincode" className="col-sm-4 col-form-label">Emergency Services Required For</label>
                <div className="col-sm-7">
                  <Dropdown options={getRescueService} dropdownHandel={getEmergencyValue} defaultvalue={defaultEmergencyValue} />
                </div>
              </div>
              <div className="form-group row my-2">
                <label htmlFor="pincode" className="col-sm-4 col-form-label">Emergency Location</label>
                <div className="col-sm-7">
                  <textarea className="form-control" id="notes" rows="3" placeholder="Emergency Location" onChange={(e) => setUserDetails({ ...userDetails, emergencyLocation: e.target.value })} value={userDetails.emergencyLocation}></textarea>
                </div>
              </div>
              <div className="form-group row my-2">
                <label htmlFor="notes" className="col-sm-4 col-form-label">Notes</label>
                <div className="col-sm-7">
                  <textarea className="form-control" id="notes" rows="3" placeholder="Note" onChange={(e) => setUserDetails({ ...userDetails, note: e.target.value })} value={userDetails.note}></textarea>
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
      <ToastContainer
        position="top-center"
        style={{ marginTop: '10px' }}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </div>
  )
}