import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

class NeuralNetwork extends Component {
  render() {
    return (
      <Container>
        <p>Neural Network</p>
      </Container>
    );
  }
}

export default connect()(NeuralNetwork);
