import React from 'react'
function Dropdown(props) {

  return (
    <div>
    <select className="form-select" onChange={(event) =>props.dropdownHandel(event.target.value)} defaultValue={'DEFAULT'} >
      <option value="DEFAULT" disabled selected={props.defaultvalue}>Choose</option>
      {props.options.map((val, index) => <option key={index} value={val}>{val}</option> )}
    </select>
    </div>
  )
}

export default Dropdown

