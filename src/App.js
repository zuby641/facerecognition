import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import Signform from './Components/Signform/Signform.js';
import Register from './Components/Register/Register.js';



import './App.css';
import Particles from 'react-particles-js';


const particlesOptions={
  particles:{
   number:{
    value:200,
    density:{
      enable:true,
      value_area:800

    }
    
    }
  }
}

const initialstate={
   input:'',
      imageUrl:'',
      box:{},
      router:'signin',
      changeit:false,
      user:{

        id:'',
         name:'',
        email:'',
       entries:0,
     joined:''
      }
}


class App extends Component {
  constructor()
  {
    super();
    this.state=initialstate;

  }//end of constructor
 /* componentDidMount(){
    fetch('https://sheltered-tundra-60358.herokuapp.com/')
    .then(response=> response.json())//find out {}problem...
    
  }*/

  loadUser=(dataa)=>
  {
    this.setState({user:{

          id:dataa.id,
         name:dataa.name,
        email:dataa.email,
       entries:dataa.entries,
     joined:dataa.joined


    }})
  }

     calculateFaceLocation=(data)=>
  {
    
  
    const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
  return(
  {

    leftCol:clarifaiFace.left_col * width,
    topRow:clarifaiFace.top_row * height,
    rightCol:width-(clarifaiFace.right_col*width),
    bottomRow:height-(clarifaiFace.bottom_row*height)
  }
  );
 
    
  }

   displayFaceBox=(box)=>
   {
    
    this.setState({box:box});

   }
   RouterChange=(dataa)=>
   {
    
    
    if(dataa==="signout")
    {
        
      this.setState(initialstate);

    }
    if(dataa==='Home')
    {
      
    
      this.setState({changeit:true});
    

    }
    
    this.setState({ router:dataa});



   }//end of routerchange fun..
  onInputChange=(event)=>
  {

     this.setState({input:event.target.value});
  }//end of the function oninputchange
  onButtonSubmit=()=>
  {

    this.setState({imageUrl:this.state.input});

          fetch('https://sheltered-tundra-60358.herokuapp.com/imageurl',{
                  'method':'post',
    'headers':{'Content-Type':'application/json'},
    'body':JSON.stringify({
     'input':this.state.input
      })

        })
    .then(response=>response.json()) 
   .then(response=>{
             if(response)
             {
                // console.log(response);
              
                fetch('https://sheltered-tundra-60358.herokuapp.com/image',{
                  'method':'put',
    'headers':{'Content-Type':'application/json'},
    'body':JSON.stringify({
     'id':this.state.user.id
      })

        })
          .then(response=>response.json())
               .then(count=>{
              this.setState(Object.assign(this.state.user,{ entries:count}))

               }) 
               .catch(console.log)
             }

      this.displayFaceBox (this.calculateFaceLocation(response))})
.catch(err=>console.log(err));

  }
  render() {
    const {  changeit,box,imageUrl,router}=this.state;
    return (
     

      <div className="App">
       <Particles className="particles"
              params={particlesOptions }
              
            />
            <Navigation  changeit={changeit} RouterChange={this.RouterChange}/>
            {
              router==="Home"?
                 <div>        
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries }/>
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit ={this.onButtonSubmit}/>
        <FaceRecognition box={box} imageUrl={imageUrl}/>
 
     
    </div>:( router==='signin'
              
              ?<Signform RouterChange={this.RouterChange}/>
              : <Register loadUser={this.loadUser} RouterChange={this.RouterChange}/>
              )
         
  }
    
       
      
      

      </div>
    );
  }
}

export default App;
