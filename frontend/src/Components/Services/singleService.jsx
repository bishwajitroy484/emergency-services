import React from 'react'
import Fire from '../../Asset/Rescue System/Fire_Rescue.webp'
import Ambulence from '../../Asset/Rescue System/Ambulance_Rescue.jpg'
import Earthquake from '../../Asset/Rescue System/Earthquake_Rescue.webp'
import Flood from '../../Asset/Rescue System/Flood_Rescue.jpg'
import Lifegaurd from '../../Asset/Rescue System/Lifegaurd_Rescue.webp'
import Mountain from '../../Asset/Rescue System/Mountain_Rescue.jpg'
import Police from '../../Asset/Rescue System/Police_Rescue.jpg'

export default function SingleService({name}) {

    let imageLoader = null;
    switch(name){
      case 'Fire': imageLoader = Fire; break;
      case 'Ambulence': imageLoader = Ambulence; break;
      case 'Earthquake': imageLoader = Earthquake; break;
      case 'Flood': imageLoader = Flood; break;
      case 'Lifegaurd': imageLoader = Lifegaurd; break;
      case 'Mountain': imageLoader = Mountain; break;
      case 'Police': imageLoader = Police; break;
      default : imageLoader =' Vicky';
    }

  return (
    <div  className='col'>
    <div className="card mx-3 mt-3">
        <img src={imageLoader} alt={imageLoader} className="card-img-top" style={{ height:'150px', ObjectFit:'cover'}}/>
        <div className='m-2 p-2' style={{minHeight:'80px'}}>
          <p className='font-weight-bold'>{name} Rescues System</p>
        </div>
      </div>
      </div> 
  )
}
