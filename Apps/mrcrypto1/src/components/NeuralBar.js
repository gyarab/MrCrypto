import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";

class NeuralBar extends Component {
  render() {
    const green = {
      color: "#05B169"
    };
    let data = this.props.data;
    let answer = "none";

    let result = data[data.length - 1];
    if (result) {
      answer = Math.round(result[0]) === 1 ? "YES" : "NO";
    }

    return (
      <Alert variant="info">
        <Alert.Heading>
          TensorFlow Neural Network - prediction for tomorrow
        </Alert.Heading>
        <hr />
        <span>
          Will Bitcoin rise tommorow? {answer}
          <br />
          Historical accuracy
        </span>{" "}
        <span style={green}>{this.props.percentage}%</span>
        <hr />
      </Alert>
    );
  }
}
function mapStateToProps(state) {
  let neural = state.neural;
  return {
    data: neural.data,
    percentage: neural.percentage
  };
}

export default connect(mapStateToProps)(NeuralBar);
