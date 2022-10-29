import React from 'react'
function Dropdown(props) {
  return (
    <div>
    <select className="form-select" onChange={(event) =>props.dropdownHandel(event.target.value)}>
      <option value='select' selected={props.defaultvalue}>select</option>
      {props.options.map((val) => <option key={val.id} value={val.id}>{val.name}</option> )}
    </select>
    </div>
  )
}

export default Dropdown

