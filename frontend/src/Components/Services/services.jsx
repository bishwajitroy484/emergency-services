import React, { useEffect, useState } from 'react'
import SingleService from './singleService'
import ServiceData from './serviceData'

export default function Services() {
  const [getRescueService, setRescueService] = useState([]);
  const [showGrid, setShowGrid] = useState(false)
  const [btndisable, setBtndisable] = useState(true)
  const [gridData, setGridData] = useState([])
  const userLogininfo = localStorage.getItem('user-info');

  const getServices = async () => {
    const res = await fetch(`http://localhost:3001/getservices/`, { method: "GET", headers: { "Content-Type": "application/json" } });
    const data = await res.json();
    if (res.status === 422 || !data) console.log("error ");
    else setRescueService(data)
  }

  useEffect(() => {
    if (userLogininfo) {
      setShowGrid(true);
      setBtndisable(false)
    }
    else {
      setShowGrid(false);
      setBtndisable(true);
    }
  }, [userLogininfo])

  useEffect(() => {
    getServices();
  }, [])

  const getServiceClicked = (val) => {
    setGridData(val)
    console.log('AAya ? ', val)
  }

  console.log('getRescueService ', getRescueService)

  return (
    <>
      <div className="serviceParentBlock mb-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
        {getRescueService.map(item => <SingleService name={item.name} keyItem={item.id} getServiceClicked={getServiceClicked} btndisable={btndisable} />)}
      </div>
      {showGrid && <ServiceData showData={gridData} loginOperator={userLogininfo} />}
    </>
  )
}
