import React, { Component, Button } from "react";
import ChartBoard from "../components/ChartBoard";
import { Container, Row, Col } from "react-bootstrap";
import MediaBoard from "../components/MediaBoard";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ChartBoard />
          </Col>
        </Row>

        <Row>
          <Col>
            <MediaBoard />
          </Col>

          <Col>
            <MediaBoard text="blabla" />
          </Col>
          <Col>
            <MediaBoard text="chnochno" />
          </Col>
        </Row>
      </Container>
    );
  }
}
