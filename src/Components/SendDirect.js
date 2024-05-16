import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Card, Col, Container, Form, Row } from 'react-bootstrap';
import './SendDirectMessage.css';
import axios from 'axios';

class SendDirectMessage extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            fromAddress: '',
            toAddress: '',
            subject: '',
            textMessage: '',
            signingCert: 'GOOD_CERT',
            signingAlgorithm: 'SHA-256',
            attachment: null,
            ccdaFile: null,
            encryptionCert: null,
        };
        this.state = this.initialState;
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        const { name, files } = e.target;
        this.setState({ [name]: files[0] });
    };

    handleCertChange = (certType) => {
        this.setState({ signingCert: certType });
    };

    handleAlgorithmChange = (algorithm) => {
        this.setState({ signingAlgorithm: algorithm });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        // You can implement the logic for submitting the form data to the server
    };

    render() {
        const { fromAddress, toAddress, subject, textMessage, signingCert, signingAlgorithm } = this.state;

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <h2>Send Direct Message v1.2</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="fromAddress">
                                <Form.Label column sm={2}>
                                    Direct From Address
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="email"
                                        name="fromAddress"
                                        value={fromAddress}
                                        onChange={this.handleInputChange}
                                        placeholder="Direct From Address"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="toAddress">
                                <Form.Label column sm={2}>
                                    Direct To Address
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="email"
                                        name="toAddress"
                                        value={toAddress}
                                        onChange={this.handleInputChange}
                                        placeholder="Direct To Address"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="subject">
                                <Form.Label column sm={2}>
                                    Message Subject or Test Session Name
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        value={subject}
                                        onChange={this.handleInputChange}
                                        placeholder="Message Subject or Test Session Name"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="textMessage">
                                <Form.Label column sm={2}>
                                    Text Message
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        as="textarea"
                                        name="textMessage"
                                        value={textMessage}
                                        onChange={this.handleInputChange}
                                        placeholder="Text Message"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="attachment">
                                <Form.Label column sm={2}>
                                    Choose document to be sent as the message content
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="file"
                                        name="attachment"
                                        onChange={this.handleFileChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="ccdaFile">
                                <Form.Label column sm={2}>
                                    Upload your own C-CDA
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="file"
                                        name="ccdaFile"
                                        onChange={this.handleFileChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="signingCert">
                                <Form.Label column sm={2}>
                                    Signing Certificate
                                </Form.Label>
                                <Col sm={10}>
                                    <ButtonToolbar>
                                        <ButtonGroup>
                                            {['GOOD_CERT', 'INVALID_CERT', 'EXPIRED_CERT', 'DIFFERENT_TRUST_ANCHOR', 'BAD_AIA'].map(cert => (
                                                <Button
                                                    key={cert}
                                                    variant={signingCert === cert ? 'success' : 'outline-secondary'}
                                                    onClick={() => this.handleCertChange(cert)}
                                                    className="m-1"
                                                >
                                                    {cert}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="invalidDigest">
                                <Form.Label column sm={2}>
                                    Select message with invalid digest
                                </Form.Label>
                                <Col sm={10}>
                                    <Button
                                        variant={signingCert === 'INVALID_DIGEST' ? 'success' : 'outline-secondary'}
                                        onClick={() => this.handleCertChange('INVALID_DIGEST')}
                                    >
                                        INVALID_DIGEST
                                    </Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="signingAlgorithm">
                                <Form.Label column sm={2}>
                                    Signing Algorithm
                                </Form.Label>
                                <Col sm={10}>
                                    <ButtonToolbar>
                                        <ButtonGroup>
                                            {['SHA-1', 'SHA-256'].map(algo => (
                                                <Button
                                                    key={algo}
                                                    variant={signingAlgorithm === algo ? 'success' : 'outline-secondary'}
                                                    onClick={() => this.handleAlgorithmChange(algo)}
                                                    className="m-1"
                                                >
                                                    {algo}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="encryptionCert">
                                <Form.Label column sm={2}>
                                    Encryption Certificate
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="file"
                                        name="encryptionCert"
                                        onChange={this.handleFileChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Send Message
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default SendDirectMessage;
