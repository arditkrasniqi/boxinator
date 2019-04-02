import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './routes';
import {Container} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
            <Routes />
        </Container>
      </div>
    );
  }
}

export default App;
