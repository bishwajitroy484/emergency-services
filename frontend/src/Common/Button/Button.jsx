import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={()=>{props.btnAction(props.val)}}>{props.name}</button>
    </div>
  )
}
