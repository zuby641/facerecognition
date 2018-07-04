import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';


import './App.css';
import Particles from 'react-particles-js';
const app = new Clarifai.App({apiKey: 'c9e397162c6f4249b402f02744dd7b92'});
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


class App extends Component {
  constructor()
  {
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }

  }//end of constructor
     calculateFaceLocation=(data)=>
  {
    const clarifaiFace= data.outpts[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementBYId('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
  return(
  {

    lefCol:clarifaiFace.left_col * width,
    topRow:clarifaiFace.top_row * height,
    rightCol:width-(clarifaiFace.right_col*width),
    bottomRow:height-(clarifaiFace.bottom_row*height)
  }
  );

    
  }

   displayFaceBox=(box)=>
   {
    console.log(box);
    this.setState({box:this.state.box})
   }
  onInputChange=(event)=>
  {

     this.setState({input:event.target.value});
  }//end of the function oninputchange
  onButtonSubmit=()=>
  {

    this.setState({imageUrl:this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response=>this.displayFaceBox (this.calculateFaceLocation(response)))
   .catch(err=>console.log(err));
  }
  render() {
    return (

      <div className="App">
       <Particles className="particles"
              params={particlesOptions }
              
            />
        
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit ={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>

      </div>
    );
  }
}

export default App;
