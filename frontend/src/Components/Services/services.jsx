import React,{useEffect, useState} from 'react'
import SingleService from './singleService'

export default function Services() {
const [getRescueService, setRescueService] = useState([]);

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

useEffect(() => {
  getServices();
}, [])

  return (
    <>
      <div className="serviceParentBlock" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      {getRescueService.map( item => <SingleService name={item.name} />)}
      </div>
    </>
  )
}
