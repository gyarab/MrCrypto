import React, { Component } from "react";
import ChartBoard from "../components/ChartBoard";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <ChartBoard />;
  }
}
