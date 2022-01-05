import React, { Component } from 'react'
import {Button, Navbar, Nav, NavDropdown, Form, FormControl, Row, Col, Spinner, Container, Card, Accordion  } from 'react-bootstrap';
import axios from 'axios'
import Counter from './Counter'
import './RunButton.css'
class RunButton extends Component {
   
    constructor(props) {
        super(props)
    
        this.initialState = {
             loading: false,
             result: false,
             error: false,
             istate: true,
             response:''

        };
        this.state = this.initialState;
    }
   
    
    onResetClick(e) {
        e.preventDefault();
        this.setState(this.initialState);
    }
    
    submitHandler = e => {
        e.preventDefault()
        this.setState({ loading : true});
        let testrequest = {

        sutEmailAddress: this.props.myObj.email,
        sutSmtpAddress: this.props.myObj.hostname,
        testCaseNumber: this.props.id,
        sutPassword: this.props.myObj.password,
        sutUserName: this.props.myObj.username,
        useTLS: true
    };
    console.log(testrequest)
		axios
			.post('/ett/api/smtpTestCases', testrequest)
			.then(response => {
                this.setState({ loading: false, response: response.data[0].lastTestResponse });
                console.log(response.data[0].lastTestResponse)
                console.log(response.data[0].criteriaMet)
                console.log(response)
                if((response.data[0].criteriaMet === "TRUE") || (response.status = '200') || (response.data[0].criteriaMet === "MANUAL")){
                    this.setState({ result: true, istate: false });
                }
                if((response.data[0].criteriaMet === "FALSE")) {
                    this.setState({ error: true, result: false });
                }
			})
			.catch(error => {
				console.log(error)
			})
    }
   
    render() {
        const { loading, result, error, response, istate} = this.state

        let finalbutton
        let logs


        if(error){
            finalbutton = <div className="d-grid gap-2"><Button size="lg" variant="danger" type="button">
            <span>{"Test Failed"}</span>
            </Button> 
            <Button size="lg" variant="info" type="button" onClick={this.onResetClick.bind(this)}>
            {error && !loading && <span>Clear</span>}
            </Button></div>
        }

        if(result && !loading){
            finalbutton = <div className="d-grid gap-2"><Button size="lg" variant="success" type="button">
            <span>{"Success"}</span>
            </Button>
            <Button size="lg" variant="info" type="button" onClick={this.onResetClick.bind(this)}>
            {result && !loading && <span>Clear</span>}
            </Button></div>
        }

        if((result && !loading) || (error && !loading)){
        logs = <div><Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header><b>Logs</b></Accordion.Header>
          <Accordion.Body>
          {response}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion></div>
        
        }

        return (
            <div>
                <Card body>
                <div></div>
                <div>
                    <Container>
  <Row>
    <Col xs={9}>
    {/* Data-->{JSON.stringify(this.props.myObj.hostname)} */}
    <h4>{this.props.testname}</h4>
    <Accordion flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header><b>More Info</b></Accordion.Header>
          <Accordion.Body>
          {this.props.moreinfo}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    {this.props.testdesc}
    {/* {this.props.fields.length
                      ? this.props.fields.map(field => <div key={field.display}> blah </div>)
                      : null} */}
    </Col>
    <Col>
    <div className="d-grid gap-2">
    <Button size="lg" variant="primary" type="button" onClick={this.submitHandler.bind(this)} disabled={loading} hidden={result || error}>
        {!loading && !result && !error && <span>RUN</span>}
  {result && !loading && <span>{"Test Passed"}</span>}
  {loading && (
    <Spinner
      as="span"
      animation="border"
      size="lg"
      role="status"
      aria-hidden="true"
    />
    )}
  </Button>
  {/* <Button size="lg" variant="success" type="button" hidden={istate}>
  {result && !loading && <span>{"Success"}</span>}
  </Button> */}
   {/* <Button size="lg" variant="danger" type="button" hidden={istate}>
  {error && !loading && <span>{"Test Failed"}</span>}
  </Button>  */}
  {/* <Button size="lg" variant="info" type="button" onClick={this.onResetClick.bind(this)}>
  {result && !loading && <span>Clear</span>}
  </Button> */}
  <Row>
  {finalbutton}
  </Row>
  </div>
  </Col>
  </Row>
  {logs}
</Container></div>
  
  <div>
  </div>
  </Card>
            </div>
            
        )
    }
}

export default RunButton
