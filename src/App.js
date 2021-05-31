import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "./sharedComponents/Navbar";
import Routes from "./components/router/Routes";



class App extends Component {


  render() {

 return(
     <BrowserRouter>
         <Navbar/>
         <Routes/>
     </BrowserRouter>
 )
  }
}

export default App;
