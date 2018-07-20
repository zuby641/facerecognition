import React from 'react';

class Register extends React.Component
{
  constructor(props)
{
  super(props);
  this.state={
    Email:'',
    password:'',
    Name:''
  }
}
onEmailChange=(event)=>
{
  
  this.setState({Email:event.target.value});
}//end of onemailchange
onNameChange=(event)=>
{
  
  this.setState({Name:event.target.value});
}//end of onNamechange

onPasswordChange=(event)=>
{
  

  this.setState({password:event.target.value});
}//end of onNamechange

onRegisterSignin=()=>
{
  
  fetch('https://sheltered-tundra-60358.herokuapp.com/register',{
    'method':'post',
    'headers':{'Content-Type':'application/json'},
    'body':JSON.stringify({ 'email':this.state.Email,'password':this.state.password,'name':this.state.Name })
  })
  .then(response=>response.json())
  .then(user=>{ 

console.log(user);
  if(user.email)
  {
     this.props.loadUser(user);
       this.props.RouterChange("Home");
  }

  })
  
}//end of onRegister...


render()
{

return(
   <article className="br2 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
<main className="pa4 black-80">
  <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f4 fw6 ph0 mh0">Registeration form </legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6"  type='text' htmlFor='name' >Name</label>
        <input onChange={ this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor='email-address'  >Email</label>
        <input onChange={ this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor='password' >Password</label>
        <input onChange={ this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="">
      <input onClick={this.onRegisterSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" type="submit" value="Register"/>
    </div>
    
  </div>
</main>
</article>
   );

}


}
export default Register;