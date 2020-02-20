import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Radars from "../components/Radars";
//import chartRadar
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

class Statistics extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/6ebcxbx4/';

  render() {
    return (
      <Container>
      <Row as={Radars} />
      </Container>
    );
  }
}

export default connect()(Statistics);
