import React, { Component } from 'react'
import {Button, Navbar, Nav, NavDropdown, Form, FormControl, Row, Col, Spinner, Container, Card, ButtonToolbar,ButtonGroup  } from 'react-bootstrap';
import axios from 'axios'
import Hello from './Hello'
import RunButton from './RunButton'


 class Xdr extends Component {

    constructor(props) {
        super(props)
    
        this.initialState = {
             tests: [],
             newtests: [],
             count: 0,
             username: '',
             password: '',
             hostname:'',
             email:'',
             sender : false,
             receiver : false
             

        };
        this.state = this.initialState;
    }

    componentDidMount() {
      axios
              .get('/ett/assets/xdrtestCases.json')
        .then(response => {
          console.log(response.data)
				  this.setState({ tests: response.data })
        })
        .catch(error => {
          console.log(error)
          this.setState({errorMsg: 'Error retrieving data'})
        })
    }

    onSenderClick(e) {
      e.preventDefault();
      this.setState({sender : true, receiver : false});
  }

  onReceiverClick(e) {
    e.preventDefault();
    this.setState({receiver : true, sender : false});
}

    changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
    }
    
    

    incre(){

        this.setState({
            count: this.state.count + 1
        })   
    }

           render() {
                const { username, password, hostname, email, loading, result, tests } = this.state

                let listoftests

                if(this.state.receiver){
                listoftests = <div>
                {tests.length
                      ? tests.map(test => test.sutRole === "receiver" ? <div key={test.name}> <RunButton testname={test.name} testdesc={test.desc} id={test.longDesc} moreinfo={test.Purpose} fields={test.fields} myObj={this.state}/></div> : null)
                      : null}
                </div>
                }

                if(this.state.sender){
                  listoftests = <div>
                  {tests.length
                        ? tests.map(test => test.sutRole === "sender" ? <div key={test.name}> <RunButton testname={test.name} testdesc={test.desc} id={test.id} moreinfo={test.longDesc} fields={test.fields} myObj={this.state}/></div> : null)
                        : null}
                  </div>
                  }

        return (
<div>
<Container>
<Row>
    <Col>
    Click to download XDR TLS certificates
      <ButtonToolbar>
    <ButtonGroup size="lg" className="mb-2">
    <Button variant="outline-success" onClick={this.onSenderClick.bind(this)}>Your system as: Sender</Button>
    <Button variant="outline-success" onClick={this.onReceiverClick.bind(this)}>Your system as: Receiver</Button>
  </ButtonGroup>
  </ButtonToolbar>
    <div>
    {listoftests}
    </div>
</Col>
  </Row>
</Container>
            </div>
        )
    }
}

export default Xdr
