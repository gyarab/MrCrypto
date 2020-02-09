import React, { Component } from "react";
import ChartMaker from "./ChartMaker";
import RadarMaker from "./RadarMaker";
import { Container, Col, Row } from "react-bootstrap";

//md={10} xs={10} lg={10}
export default class Charts extends Component {
  render() {
    return (
      <Row>
        <Col as={ChartMaker} />
      </Row>
    );
  }
}
