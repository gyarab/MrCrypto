import React, { Component, Button } from "react";
import ChartBoard from "../components/ChartBoard";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <button type="button" class="btn btn-primary">
          Primary
        </button>
        <ChartBoard />
      </div>
    );
  }
}
