import React, { Component } from "react";
import DataGather from "./DataGather";

export default class ChartBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DataGather />
      </div>
    );
  }
}
