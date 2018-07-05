import React from 'react';
import './FaceRecognition.css'

const FaceRecognition=(props)=>
{
console.log(props.box);
return(
<div className='center ma'>
<div className='absolute mt2'>
<img id='inputImage' alt='this should be shown' src={props.imageUrl } width='400px' height='auto' />
<div className='bounding_box' style={{top:props.box.topRow,right:props.box.rightCol,bottom:props.box.bottomRow,left:props.box.leftCol}}></div>
 </div>
</div>
	);

}
export default FaceRecognition;