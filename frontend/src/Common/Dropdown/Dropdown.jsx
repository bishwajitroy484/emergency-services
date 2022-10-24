import React from 'react'

function Dropdown(props) {

  return (
    <div>
    <select className="form-select">
      <option selected>select</option>
      {props.options.map((val, index) => <option key={index} value={index}>{val}</option> )}
    </select>
    </div>
  )
}

export default Dropdown

