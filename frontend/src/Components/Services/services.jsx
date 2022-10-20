import React from 'react'
import SingleService from './singleService'

export default function Services() {

const servicesObj = [{id:1, name:'Name1'},{id:2, name:'Name2'},{id:3, name:'Name3'},{id:4, name:'Name4'},{id:5, name:'Name5'},{id:6, name:'Name6'}]
  return (
    <>
      <div className="serviceParentBlock" style={{'display': 'flex','flex-wrap': 'wrap', 'align-items': 'center', 'justify-content': 'space-between'}}>
      {servicesObj.map( item => <SingleService name={item.name} />)}
      </div>
    </>
  )
}
