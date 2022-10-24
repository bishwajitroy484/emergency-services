import React, { useState } from 'react'
import './Home.css'
import Dropdown from '../../Common/Dropdown/Dropdown'
import Button from '../../Common/Button/Button'

export default function Home() {

  const [callInfo , setCallInfo] = useState([])

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
    { phoneNumber: 579799974, city: 'Delhi', callStart: "10:00:00", callEnd: "10:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 134787789, city: 'Noida', callStart: "11:00:00", callEnd: "11:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 676346789, city: 'Meerut', callStart: "12:00:00", callEnd: "12:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 564777283, city: 'Gurugram', callStart: "13:00:00", callEnd: "13:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 167456789, city: 'Karnal', callStart: "14:00:00", callEnd: "14:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 674992943, city: 'Banaras', callStart: "15:00:00", callEnd: "15:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 870707705, city: 'Lucknow', callStart: "16:00:00", callEnd: "16:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 894473103, city: 'Shimla', callStart: "17:00:00", callEnd: "17:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
    { phoneNumber: 674820032, city: 'Delhi', callStart: "18:00:00", callEnd: "18:12:00", CallInfo: 'User&Operator Conversation', emergency:'' ,note:'No Notes', status:'' },
  ]

  const generateCall = () =>{
    setCallInfo([data[parseInt(Math.random() * 10)]])
  }

  const getAction = (action) =>{
    console.log('Action ', action)
  }

  return (
    <div>
      <div className="m-3" style={{textAlign: "end"}}>
      <button className='btn btn-primary btn-sm' type="button" onClick={generateCall}>Initiate Call</button>
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
              <td><Dropdown options={['Fire','Ambulance','Police','Mountain','Flood']}/></td>
              <td>{val.note}</td>
              <td><Dropdown options={['successful Call','Call rerouted','Call interrupted','Call dropped']}/></td>
              <td><Button name={"Submit"} btnAction={getAction} val={val}/></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}
