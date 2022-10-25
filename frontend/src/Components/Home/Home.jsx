import React, { useState } from 'react'
import './Home.css'
import Dropdown from '../../Common/Dropdown/Dropdown'
import Button from '../../Common/Button/Button'
import { useEffect } from 'react'

export default function Home() {

  const [callInfo , setCallInfo] = useState([])
  const [emergencyStatus , setEmergencyStatus] = useState()
  const [callStatus , setCallStatus] = useState()
  const [defaultStatusValue, setDefaultStatusValue] = useState(true)
  const [defaultEmergencyValue, setDefaultEmergencyValue] = useState(true)

  const [isDisableAction, setisDisableAction] = useState(true)

  const column = [
    { id:1, name:'Phone Number'  },
    { id:2, name:'City'  },
    { id:3, name:'Call Start'  },
    { id:4, name:'Call End'  },
    { id:5, name:'Call Info'  },
    { id:6, name:'Emergency Required'},
    { id:7, name:'Notes'  },
    { id:8, name:'Status'  },
    { id:9, name:'Action'  },
  ]

  const data = [
    { phoneNumber: 579799974, city: 'Delhi', callStart: "10:00:00", callEnd: "10:12:00", CallInfo: 'User&Operator Conversation 1 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 134787789, city: 'Noida', callStart: "11:00:00", callEnd: "11:12:00", CallInfo: 'User&Operator Conversation 2 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 676346789, city: 'Meerut', callStart: "12:00:00", callEnd: "12:12:00", CallInfo: 'User&Operator Conversation 3 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 564777283, city: 'Gurugram', callStart: "13:00:00", callEnd: "13:12:00", CallInfo: 'User&Operator Conversation 4 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 167456789, city: 'Karnal', callStart: "14:00:00", callEnd: "14:12:00", CallInfo: 'User&Operator Conversation 5 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 674992943, city: 'Banaras', callStart: "15:00:00", callEnd: "15:12:00", CallInfo: 'User&Operator Conversation 6 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 870707705, city: 'Lucknow', callStart: "16:00:00", callEnd: "16:12:00", CallInfo: 'User&Operator Conversation 7 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 894473103, city: 'Shimla', callStart: "17:00:00", callEnd: "17:12:00", CallInfo: 'User&Operator Conversation 8 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 674820032, city: 'Delhi', callStart: "18:00:00", callEnd: "18:12:00", CallInfo: 'User&Operator Conversation 9 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 667838772, city: 'Lucknow', callStart: "19:00:00", callEnd: "19:12:00", CallInfo: 'User&Operator Conversation 10 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 199388333, city: 'Manali', callStart: "20:00:00", callEnd: "20:12:00", CallInfo: 'User&Operator Conversation 11 ', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 674882229, city: 'Dehradun', callStart: "21:00:00", callEnd: "21:12:00", CallInfo: 'User&Operator Conversation 12 ', emergency:'' ,note:'No Notes', status:'' },
  ]

  const generateCall = () =>{
    setCallInfo([data[parseInt(Math.random() * 10)]])
    setDefaultStatusValue(true)
    setDefaultEmergencyValue(true)
    setisDisableAction(true)
  }

  const getAction = (action) =>{
    setDefaultStatusValue(false)
    setDefaultEmergencyValue(false)
    console.log('Action ', action)
    console.log('emergencyStatus ', emergencyStatus)
    console.log('callStatus ', callStatus)
  }

  const getEmergencyValue = (value) => {setEmergencyStatus(value); setDefaultEmergencyValue(false)}

  const getStatusValue = (value) =>  {setCallStatus(value); setDefaultStatusValue(false) }
  
  useEffect(()=>{
    if(emergencyStatus && callStatus && callStatus !== 'DEFAULT' &&  emergencyStatus !== 'DEFAULT') setisDisableAction(false)
    else setisDisableAction(true)
  },[callStatus,emergencyStatus])

  return (
    <div>
      <div className="m-3" style={{textAlign: "end"}}>
      <button className='btn btn-primary btn-sm' type="button" onClick={generateCall}>Incoming Call</button>
    </div>


      <table className='table table-bordered' style={{tableLayout: 'fixed',width: '95%', marginLeft: '30px'}}>
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
      </table>
    </div>
  )
}
