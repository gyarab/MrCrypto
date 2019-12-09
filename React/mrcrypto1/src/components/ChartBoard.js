import React, { PureComponent } from "react";
import DataGather from "./DataGather";

export default class ChartBoard extends PureComponent {
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
