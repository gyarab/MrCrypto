import React, { Component } from "react";
import RadarMaker from "./RadarMaker";
import { Col, Row } from "react-bootstrap";

//md={10} xs={10} lg={10}
export default class Radars extends Component {
  render() {
    return (
        <Col as={RadarMaker} />
    );
  }
}
