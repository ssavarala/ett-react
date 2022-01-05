import React, {Component} from 'react'
import {Row, Col, Container, Card  } from 'react-bootstrap';

class EttHome extends Component {
    
    constructor(){
        super()
        this.state = {
           
        }
    }
    
   
    
    
    
    render() {
        return (
            <Container>
            <Row>
              <Col></Col>
              <Col xs={9}>
              <Row>
                <Col><Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card></Col>
                <Col><Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card></Col>
                <Col><Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card></Col>
              </Row>
              <Row>
                <Col><Card body>This is some text within a card body.</Card></Col>
                <Col><Card body>This is some text within a card body.</Card></Col>
                <Col><Card body>This is some text within a card body.</Card></Col>
              </Row>
              </Col>
              <Col></Col>
            </Row>
          </Container>


        ) 
    }
}

export default EttHome