import React from 'react'
import Fire from '../../Asset/Rescue System/Fire_Rescue.webp'
import Ambulence from '../../Asset/Rescue System/Ambulance_Rescue.jpg'
import Earthquake from '../../Asset/Rescue System/Earthquake_Rescue.webp'
import Flood from '../../Asset/Rescue System/Flood_Rescue.jpg'
import Lifegaurd from '../../Asset/Rescue System/Lifegaurd_Rescue.webp'
import Mountain from '../../Asset/Rescue System/Mountain_Rescue.jpg'
import Police from '../../Asset/Rescue System/Police_Rescue.jpg'

export default function SingleService(props) {
  let imageLoader = null;
  let serviceName = ''
  switch (props.name) {
    case 'Fire': imageLoader = Fire; serviceName = `${props.name} Response Services`; break;
    case 'Ambulence': imageLoader = Ambulence; serviceName = `${props.name} Response Services`; break;
    case 'Earthquake': imageLoader = Earthquake; serviceName = `${props.name} Rescue Services`; break;
    case 'Flood': imageLoader = Flood; serviceName = `${props.name} Response Services`; break;
    case 'Lifegaurd': imageLoader = Lifegaurd; serviceName = `${props.name} Response Services`; break;
    case 'Mountain': imageLoader = Mountain; serviceName = `${props.name} Response Services`; break;
    case 'Police': imageLoader = Police; serviceName = `${props.name} Response Services`; break;
    default: imageLoader = 'undefined';
  }

  return (
    <div className='col' key={props.keyItem}>
      <div className="card mx-3 mt-3" style={{ boxShadow: '0px 0px 4px 2px' }}>
        <img src={imageLoader} alt={imageLoader} className="card-img-top" style={{ height: '150px', ObjectFit: 'cover' }} />
        <div className='m-2 p-2' style={{ minHeight: '112px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p className='font-weight-bold'>{serviceName}</p>
          <button type="button" className='btn btn-sm btn-primary' disabled={props.btndisable} onClick={() => props.getServiceClicked(props.keyItem)}>Get Details</button>
        </div>
      </div>
    </div>
  )
}
