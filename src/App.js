import React from 'react';
import './App.css';
import Counter from './Components/Counter'
import Xdr from './Components/Xdr'
import EttHome from './Components/EttHome'
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
