import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Greet from './Components/Greet'
import Welcome from './Components/Welcome'
import Hello from './Components/Hello'
import Message from './Components/Message'
import Counter from './Components/Counter'
import Xdr from './Components/Xdr'
import EttHome from './Components/EttHome'
import PostList from './Components/PostList'
import FunctionClick from './Components/FunctionClick'
import {Nav, Navbar} from 'react-bootstrap'
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="sm" >
          <Navbar.Brand as={Link} to="/">ETT Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/counter">SMTP</Nav.Link>
              <Nav.Link as={NavLink} to="/xdr">XDR</Nav.Link>
              <Nav.Link as={NavLink} to="/etthome">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/counter' component={Counter}/>
          <Route exact path='/xdr' component={Xdr}/>
          <Route exact path='/etthome' component={EttHome}/>
          <Redirect from="/" to="/counter"/>
        </Switch>
    </BrowserRouter>
    
  );
}

export default App;
