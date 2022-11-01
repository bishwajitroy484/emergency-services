import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button type="button" className="btn btn-primary btn-sm" style={{ width: '25%', float: 'right', marginRight: '75px' }} onClick={() => { props.btnAction(props.val) }} disabled={props.isDisable}>{props.name}</button>
    </div>
  )
}
