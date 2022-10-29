import React, { useState, useEffect } from 'react'
import './Home.css'
import Dropdown from '../../Common/Dropdown/Dropdown'
import Button from '../../Common/Button/Button'
import Timer from '../../Common/StopWatch/Timer'
import { FiPhoneCall } from 'react-icons/fi';
import { MdCallEnd } from 'react-icons/md';
import moment from 'moment'

export default function Home() {

  const [emergencyStatus , setEmergencyStatus] = useState()
  const [callStatus , setCallStatus] = useState()
  const [defaultStatusValue, setDefaultStatusValue] = useState(true)
  const [defaultEmergencyValue, setDefaultEmergencyValue] = useState(true)
  const [isGetCallVisible, setisGetCallVisible] = useState(false)
  const [callStartTime , setCallStartTime] =useState(null)
  const [callEndTime , setCallEndTime] =useState(null)
  const [isDisableAction, setisDisableAction] = useState(true)
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [checkUserInfo, setCheckUserInfo] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [mobile, setMobile] = useState('')
  const [endCall , setEndCall] = useState(true)

  useEffect(() => {
    let interval = null;
  
    if (isActive ) {
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

  useEffect(()=>{
    // console.log('emergencyStatus ', emergencyStatus)
    // console.log('callStatus ', callStatus)

    if(emergencyStatus && callStatus && callEndTime != "" && callStatus != 'select' && emergencyStatus!='select') setisDisableAction(false)
    else setisDisableAction(true)
  },[callStatus,emergencyStatus, callEndTime])

  // const data = [
  //   { phoneNumber: 579799974, city: 'Delhi', callStart: "10:00:00", callEnd: "10:12:00", CallInfo: 'User&Operator Conversation 1 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 134787789, city: 'Noida', callStart: "11:00:00", callEnd: "11:12:00", CallInfo: 'User&Operator Conversation 2 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 676346789, city: 'Meerut', callStart: "12:00:00", callEnd: "12:12:00", CallInfo: 'User&Operator Conversation 3 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 564777283, city: 'Gurugram', callStart: "13:00:00", callEnd: "13:12:00", CallInfo: 'User&Operator Conversation 4 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 167456789, city: 'Karnal', callStart: "14:00:00", callEnd: "14:12:00", CallInfo: 'User&Operator Conversation 5 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 674992943, city: 'Banaras', callStart: "15:00:00", callEnd: "15:12:00", CallInfo: 'User&Operator Conversation 6 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 870707705, city: 'Lucknow', callStart: "16:00:00", callEnd: "16:12:00", CallInfo: 'User&Operator Conversation 7 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 894473103, city: 'Shimla', callStart: "17:00:00", callEnd: "17:12:00", CallInfo: 'User&Operator Conversation 8 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 674820032, city: 'Delhi', callStart: "18:00:00", callEnd: "18:12:00", CallInfo: 'User&Operator Conversation 9 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 667838772, city: 'Lucknow', callStart: "19:00:00", callEnd: "19:12:00", CallInfo: 'User&Operator Conversation 10 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 199388333, city: 'Manali', callStart: "20:00:00", callEnd: "20:12:00", CallInfo: 'User&Operator Conversation 11 ', emergency:'' ,note:'No Notes', status:'' },
  //   { phoneNumber: 674882229, city: 'Dehradun', callStart: "21:00:00", callEnd: "21:12:00", CallInfo: 'User&Operator Conversation 12 ', emergency:'' ,note:'No Notes', status:'' },
  // ]

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
  };

  const getAction = (e) =>{
    setDefaultStatusValue(true)
    setDefaultEmergencyValue(true)
    setCallStartTime('')
    setCallEndTime('')
    setShowMsg(false);
    setisGetCallVisible(false)
    setMobile('');
    setEndCall(true)
    console.log('Action ', e)
  }

  const getEmergencyValue = (value) => {setEmergencyStatus(value); setDefaultEmergencyValue(false)}

  const getStatusValue = (value) =>  {setCallStatus(value); setDefaultStatusValue(false) }

  const getUserDetailBtn = () => {setCheckUserInfo(checkUserInDB(mobile)); setShowMsg(true);}

  function checkUserInDB(userMobileNum){
    const dummyMobile = [1,2,3,4];
    if(dummyMobile.includes(parseInt(userMobileNum))) return true;
    return false
  }

  return (

    <div className='container-fluid'>

    <div className='row'>
      <div className='col-3'>

      <div className="mt-3">      
        <Timer time={time} />
        <button className='btn btn-success btn-sm callButton' type="button" onClick={handleStart}><FiPhoneCall/> Call Received</button>
        <button className='btn btn-danger btn-sm m-2 callButton' type="button" disabled={endCall} onClick={handleEnd} ><MdCallEnd/> Call End</button>        
      </div>

      {isGetCallVisible &&
      <div className="input-group input-group-sm mb-3 ml-3" style={{marginTop: '10px'}}>
    <input type="number" className="form-inline" placeholder='Enter Mobile Number' onChange={(e)=> setMobile(e.target.value)} value={mobile}/>
    <button className='btn btn-primary' style={{width: '91px'}} onClick={getUserDetailBtn}>Get Details</button>
   </div>
    }
          
      {showMsg &&<p>{checkUserInfo ? 'User Found':'User Not Found'}</p>}
      </div>

      <div className='col-5 mt-3'>
        <h3 style={{textAlign: 'center'}}>User Information</h3>

        <form>
          <div className="form-group row my-2">
            <label htmlFor="phoneNum" className="col-sm-4 col-form-label">Phone Number</label>
            <div className="col-sm-7">
              <input type="number" className="form-control" id="phoneNum" placeholder="Phone Number"/>
            </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="adhar" className="col-sm-4 col-form-label">Adhar Number</label>
              <div className="col-sm-7">
                <input type="number" className="form-control" id="adhar" placeholder="Adhar Number"/>
              </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="houseNum" className="col-sm-4 col-form-label">House No.</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="houseNum" placeholder="House Number"/>
              </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="streeName" className="col-sm-4 col-form-label">Steer Name</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="streeName" placeholder="Street Name"/>
              </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="cityName" className="col-sm-4 col-form-label">City</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="cityName" placeholder="City"/>
              </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="pincode" className="col-sm-4 col-form-label">Pin Code</label>
              <div className="col-sm-7">
                <input type="number" className="form-control" id="pincode" placeholder="Pin Code"/>
              </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="pincode" className="col-sm-4 col-form-label">Emergency Required</label>
              <div className="col-sm-7">
                <Dropdown options={['Fire','Ambulance','Police','Mountain','Flood']} dropdownHandel={getEmergencyValue} defaultvalue={defaultEmergencyValue}/>
              </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="notes" className="col-sm-4 col-form-label">Notes</label>
              <div className="col-sm-7">
               <textarea className="form-control" id="notes" rows="3" placeholder="Note"></textarea>
                {/* <input type="text" className="form-control" id="notes" placeholder="Note"/> */}
              </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="pincode" className="col-sm-4 col-form-label">Call Status</label>
              <div className="col-sm-7">
               <Dropdown options={['Successful Call','Call Rerouted','Call Interrupted','Call Dropped']} dropdownHandel={getStatusValue} defaultvalue={defaultStatusValue}/>
              </div>
          </div>
          <Button name={"Submit"} btnAction={getAction} val={'Data'} isDisable={isDisableAction}/>
        </form>

      </div>

     <div className='col-4 mt-5'>
      <form>
        <div className="form-group row my-2">
          <label htmlFor="startTime" className="col-sm-3 col-form-label">Start Time :</label>
            <div className="col-sm-7">
             <input type="text" readonly className="form-control" id="startTime" disabled value={callStartTime}/>
            </div>
        </div>
        <div className="form-group row my-2">
          <label htmlFor="endTime" className="col-sm-3 col-form-label">End Time :</label>
            <div className="col-sm-7">
              <input type="text" readonly className="form-control" id="endTime" disabled value={callEndTime}/>
            </div>
        </div>
      </form>
     </div>

      </div>
    </div>
  )
}


// eslint-disable-next-line no-lone-blocks
{/* <table className='table table-bordered' style={{tableLayout: 'fixed',width: '95%', marginLeft: '30px'}}>
<thead>
  <tr>
  {column.map((val, key) => <th key={key}>{val.name}</th>)}
  </tr>
  </thead>
  <tbody>
  {callInfo.map((val, key) => {
    return (
      <tr key={key}>
        <td>{val.phoneNumber}</td>
        <td>{val.city}</td>
        <td>{val.callStart}</td>
        <td>{val.callEnd}</td>
        <td>{val.CallInfo}</td>
        <td><Dropdown options={['Fire','Ambulance','Police','Mountain','Flood']} dropdownHandel={getEmergencyValue} defaultvalue={defaultEmergencyValue}/></td>
        <td>{val.note}</td>
        <td><Dropdown options={['Successful Call','Call Rerouted','Call Interrupted','Call Dropped']} dropdownHandel={getStatusValue} defaultvalue={defaultStatusValue}/></td>
        <td><Button name={"Submit"} btnAction={getAction} val={val} isDisable={isDisableAction}/></td>
      </tr>
    )
  })}
  </tbody>
</table> */}