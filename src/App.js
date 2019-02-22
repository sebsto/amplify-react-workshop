import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Notes App</h1>
      </header>
    )
  }
}


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { notes:[] }
  }
  
  render() {
    return (
      <div className="row">
        <div className="col m-3">
          <Header/>
        </div> 
      </div> 
    );
  }
}
export default App;