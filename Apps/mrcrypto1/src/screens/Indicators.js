import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RadarMaker from "../components/RadarMaker";
import IndicatorsAccordion from "../components/IndicatorsAccordion";

export default class Indicators extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/6ebcxbx4/";

  render() {
    const info = {
      color: "#5d5d5d",
      fontSize: "18px"
    };
    const headline = {
      color: "#444444",
      fontSize: "36px"
    };
    return (
      <Container>
        <Row className="justify-content-md-center centered">
          <Col>
            <h2 style={headline}>Success Rate</h2>
            <p style={info}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc
              tincidunt ante vitae massa. Maecenas libero. Aliquam ornare wisi
              eu metus. Morbi leo mi, nonummy eget tristique non, rhoncus non
              leo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante
              cursus purus, vel sagittis velit mauris vel metus. Nullam sapien
              sem, ornare ac, nonummy non, lobortis a enim. Phasellus faucibus
              molestie nisl. Itaque earum rerum hic tenetur a sapiente delectus,
              ut aut reiciendis voluptatibus maiores alias consequatur aut
              perferendis doloribus asperiores repellat. Mauris dictum facilisis
              augue.
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
