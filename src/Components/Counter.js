import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './Counter.css';
import axios from 'axios';
import RunButton from './RunButton';

class Counter extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            tests: [],
            newtests: [],
            count: 0,
            username: '',
            password: '',
            hostname: '',
            email: '',
            sender: false,
            receiver: false,
            errorMsg: ''
        };
        this.state = this.initialState;
    }

    componentDidMount() {
        axios
            .get('/ett/api/smtpcasesjson')
            .then(response => {
                console.log('API Response:', response.data);
                this.setState({ tests: response.data.tests });
            })
            .catch(error => {
                console.log('API Error:', error);
                this.setState({ errorMsg: 'Error retrieving data' });
            });
    }

    onSenderClick(e) {
        e.preventDefault();
        this.setState({ sender: true, receiver: false }, () => {
            console.log('Sender state updated:', this.state);
        });
    }

    onReceiverClick(e) {
        e.preventDefault();
        this.setState({ receiver: true, sender: false }, () => {
            console.log('Receiver state updated:', this.state);
        });
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    incre() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        const { username, password, hostname, email, tests } = this.state;

        let listoftests = null;

        if (this.state.receiver) {
            listoftests = (
                <div>
                    {tests.length
                        ? tests.map(test =>
                            test.sutRole === 'receiver' ? (
                                <div key={test.id}>
                                    <RunButton
                                        testname={test.name}
                                        testdesc={test.desc}
                                        id={test.id}
                                        moreinfo={test.longDesc}
                                        fields={test.fields}
                                        myObj={this.state}
                                    />
                                </div>
                            ) : null
                        )
                        : null}
                </div>
            );
        }

        if (this.state.sender) {
            listoftests = (
                <div>
                    {tests.length
                        ? tests.map(test =>
                            test.sutRole === 'sender' ? (
                                <div key={test.id}>
                                    <RunButton
                                        testname={test.name}
                                        testdesc={test.desc}
                                        id={test.id}
                                        moreinfo={test.longDesc}
                                        fields={test.fields}
                                        myObj={this.state}
                                    />
                                </div>
                            ) : null
                        )
                        : null}
                </div>
            );
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <Row>
                                <Col></Col>
                                <Col xs={8}>
                                    <h4>Your system as</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col xs={9}>
                                    <ButtonToolbar>
                                        <ButtonGroup size="lg" className="mb-2">
                                            <Button variant="outline-success" onClick={this.onSenderClick.bind(this)}>
                                                Sender
                                            </Button>
                                            <Button variant="outline-success" onClick={this.onReceiverClick.bind(this)}>
                                                Receiver
                                            </Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </Col>
                            </Row>
                            <Card body>
                                <Row>
                                    <Col></Col>
                                    <Col xs={10}>
                                        <Form>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Col sm="10">
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={email}
                                                        onChange={this.changeHandler}
                                                        placeholder="SUT Email"
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Col sm="10">
                                                    <Form.Control
                                                        type="hostname"
                                                        name="hostname"
                                                        value={hostname}
                                                        onChange={this.changeHandler}
                                                        placeholder="Hostname"
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Col sm="10">
                                                    <Form.Control
                                                        type="username"
                                                        name="username"
                                                        value={username}
                                                        onChange={this.changeHandler}
                                                        placeholder="Username"
                                                    />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                                <Col sm="10">
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={this.changeHandler}
                                                        placeholder="Password"
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check type="checkbox" label="TLS Required" />
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col>
                            <div>{listoftests}</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Counter;
