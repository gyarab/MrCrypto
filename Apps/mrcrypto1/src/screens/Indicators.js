import React, { Component } from "react";
import { Container, Row, Accordion, Card } from "react-bootstrap";
import { connect } from "react-redux";
//fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const names = require("../components/indicatorsNames.json");
const definitions = require("../components/indicatorsDefinitions.json");
const lists = require("../components/lists.json");

class Indicators extends Component {
  render() {
    const writing = {
      color: "#5d5d5d",
      fontSize: "18px"
    };
    const headline = {
      color: "#444444",
      fontSize: "36px"
    };
    let indicators = lists.indicators;

    let card = (name, i) => {
      return (
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={i}>
            {names[name]}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={i}>
            <Card.Body>{definitions[name]}</Card.Body>
          </Accordion.Collapse>
        </Card>
      );
    };

    return (
      <Container>
        <Row>
          <h2 style={headline}>
            <FontAwesomeIcon icon={faChartLine} /> Indikátory Technických
            analýz:
          </h2>
        </Row>
        <Accordion defaultActiveKey={0}>
          {indicators.map((name, i) => card(name, i))}
        </Accordion>
      </Container>
    );
  }
}

export default connect()(Indicators);
