import React, {Component} from 'react'
import {Button, Navbar, Nav, NavDropdown, Form, FormControl  } from 'react-bootstrap';
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch} from 'react-router-dom'
import Hello from './Hello'

class Welcome extends Component {
    render() {
        return (
<div>
<BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="sm" >
          <Navbar.Brand as={Link} to="/">React Demo App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={NavLink} to="/Hello">Hello</Nav.Link>
             
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
    </BrowserRouter>
</div>

        )
    }
}

export default Welcome