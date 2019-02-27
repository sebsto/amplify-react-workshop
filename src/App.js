import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { queries } from './queries';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react'; 

import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project
Amplify.configure(aws_exports);

const debug = (msg) => {
  console.log(msg);
}

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

class AddNote extends Component {
  
  constructor(props) {
    super(props);
    this.state = { note: '' }
  }
  
  handleChange = (event) => {
    this.setState( { note: event.target.value } );
  }
  
  handleClick = (event) => {
    event.preventDefault();    

    // let the app manage the persistence & state 
    this.props.addNote( this.state ); 
    
    // reset the input text box value
    this.setState( { note: '' } );
  }
  
  render() {
    return (
      <div className="container p-3">
            <div className="input-group mb-3 p-3">
              <input type="text" className="form-control form-control-lg" placeholder="New Note" aria-label="Note" aria-describedby="basic-addon2" value={ this.state.note } onChange={this.handleChange}/>
              <div className="input-group-append">
                <button onClick={ this.handleClick } className="btn btn-primary" type="submit">{ "Add Note" }</button>
              </div>
            </div>
        </div>  
    )
  }
}


class NotesList extends Component {
  
    render() {

      return (
        <React.Fragment>
          <div className="container">
          { this.props.notes.map( (note) => 
            <div key={note.id} className="border border-primary rounded p-3 m-3">
              <span>{note.note}</span>
              <button type="button" className="close" onClick={ (event) => { this.props.deleteNote(note) } }>
                <i className="fas fa-trash-alt"></i>
              </button>        
            </div>
          )}
          </div>
        </React.Fragment>
      )
    }   
}
          
class App extends Component {

  constructor(props) {
    super(props);
    this.state = { notes:[] }
  }
  
  deleteNote = async (note) => {
    await API.graphql(graphqlOperation(queries.deleteNote, note));
    this.setState( { notes: this.state.notes.filter( (value, index, arr) => { return value.id !== note.id; }) } );
  }
  
  addNote = async (note) => {
    var result = await API.graphql(graphqlOperation(queries.createNote, note));
    this.state.notes.push(result.data.createNote)
    this.setState( { notes: this.state.notes } )
  }
  
  async componentDidMount(){
    var result = await API.graphql(graphqlOperation(queries.listNotes));
    this.setState( { notes: result.data.listNotes.items } )
  }  

  render() {
    return (
      <div className="row">
        <div className="col m-3">
          <Header/>
          <AddNote addNote={ this.addNote }/>
          <NotesList notes={ this.state.notes } deleteNote={ this.deleteNote }/>
        </div> 
      </div> 
    );
  }
}
export default withAuthenticator(App, { includeGreetings: true });