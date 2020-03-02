import React, { Component } from "react";
import { Container, Row, Accordion, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const names = require("../json/indicatorsNames.json");
const definitions = require("../json/indicatorsDefinitions.json");
const lists = require("../json/lists.json");

class IndicatorsAccordion extends Component {
  round = value => Math.round(value * 100) / 100;
  render() {
    const headline = {
      color: "#444444",
      fontSize: "36px"
    };
    const green = {
      color: "#05B169"
    };

    let statistics = this.props.statistics;
    let indicators = lists.indicators;

    let card = (name, i) => {
      let indicator = names[name] + ",";
      let accuracy = ` ${this.round(statistics[name])}% deviation`;
      return (
        <Card key={i}>
          <Accordion.Toggle as={Card.Header} eventKey={i}>
            <span className="indicator">{indicator}</span>
            <span style={green}>{accuracy}</span>
            <FontAwesomeIcon
              className="info"
              pull="right"
              icon={faInfoCircle}
              style={{ marginTop: "5px" }}
            />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i}>
            <Card.Body>{definitions[name]}</Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    };

    return (
      <Container style={{ marginBottom: "100px" }}>
        <Row className="centered">
          <h2 style={headline}>Stats and Informations</h2>
        </Row>
        <Accordion defaultActiveKey={0}>
          {indicators.map((name, i) => card(name, i))}
        </Accordion>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  let indicators = state.indicators;
  return {
    statistics: indicators.statistics
  };
}

export default connect(mapStateToProps)(IndicatorsAccordion);
