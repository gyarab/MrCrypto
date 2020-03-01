import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RadarMaker from "../components/RadarMaker";
import StatisticsTableMaker from "../components/StatisticsTableMaker";

export default class Statistics extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  render() {
    const indi = {
      color: "#5d5d5d",
      fontSize: "18px"
    };

    const headline = {
      color: "#444444",
      fontSize: "36px"
    };
    return (
      <Container>
        <Row>
          <Col>
            <h2 style={headline}>Indicators success rate</h2>
            <p style={indi}>
Here you can see overall succession of each indicator. By sucession is meant averaged procentual differnces between price of each historical price of bitcoin and predicted price by the indicator.
            </p>
          </Col>
          <Col>
            <RadarMaker />
          </Col>
        </Row>
        <Row>
          <StatisticsTableMaker />
        </Row>
      </Container>
    );
  }
}
