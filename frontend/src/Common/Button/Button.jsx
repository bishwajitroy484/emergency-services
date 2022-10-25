import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button type="button" className="btn btn-primary btn-sm w-100 " onClick={()=>{props.btnAction(props.val)}} disabled={props.isDisable}>{props.name}</button>
    </div>
  )
}
