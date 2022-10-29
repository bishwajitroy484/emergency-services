import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button type="button" className="btn btn-primary btn-sm" style={{width:'50%',marginLeft:'10em'}} onClick={()=>{props.btnAction(props.val)}} disabled={props.isDisable}>{props.name}</button>
    </div>
  )
}
