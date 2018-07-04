import React from 'react';
import './ImageLinkForm.css'


import 'tachyons';


const ImageLinkForm=(props)=>
{
return(

   <div  >
   <p>{'This magic brain will detect face in your picture give it a try.'}</p>
   <div className='center'>
   <div className='center form pa4 br3 shadow-5   '>
   <input className='f4 pa2 w-70 center' type='tex' onChange={ props.onInputChange} />
   <button  className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer' onClick={props.onButtonSubmit} >Detect</button>
   </div>
   </div>
   </div> 

	);
}
export default ImageLinkForm;
