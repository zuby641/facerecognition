import React from 'react';

const FaceRecognition=(props)=>
{

return(
<div className='center ma'>
<div className='absolute mt2'>
<img id='inputImage' alt='this should be shown' src={props.imageUrl } width='400px' height='auto' />
 </div>
</div>
	);

}
export default FaceRecognition;