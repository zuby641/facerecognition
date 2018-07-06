import React from 'react';

const Navigation=(props)=>
{
	console.log(props.changeit+'  it is value of isssignedin');
if(props.changeit){
return(
<nav style={{display:'flex',justifyContent:'flex-end'}}>
<p  onClick={()=>props.RouterChange("signin")} className='f3 link dim black underline pa3 pointer'>Sign Out </p>
</nav>

	);
}
else
{
	return(


 <nav style={{display:'flex',justifyContent:'flex-end'}}>
    <p  onClick={()=>props.RouterChange("signin")} className='f3 link dim black underline pa3 pointer'>Sign In </p>
      <p  onClick={()=>props.RouterChange("register")} className='f3 link dim black underline pa3 pointer'>Register </p>
  </nav>


		);
}

}
export default Navigation;