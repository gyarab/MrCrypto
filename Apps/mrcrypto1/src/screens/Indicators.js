import React, { Component } from "react";
import RadarMaker from "../components/RadarMaker";
import IndicatorsAccordion from "../components/IndicatorsAccordion";
import { Container, Col, Row } from "react-bootstrap";

export default class Indicators extends Component {
  render() {
    const headline = {
      color: "#444444",
      fontSize: "36px"
    };
    const info = {
      color: "#5d5d5d",
      fontSize: "18px"
    };

    return (
      <Container>
        <Row className="justify-content-md-center centered">
          <Col>
            <h2 style={headline}>Success Rate</h2>
            <p style={info}>
              Here you can see overall succession of each indicator. By
              success it is meant the averaged percentage differences between
              each historical price of bitcoin and predicted price by the
              indicator. In result this can show which indicator best fits
               a particular chart, such as a historical bitcoin price chart.
            </p>
          </Col>
          <Col>
            <RadarMaker />
          </Col>
        </Row>
        <Row>
          <IndicatorsAccordion />
        </Row>
      </Container>
    );
  }
}
