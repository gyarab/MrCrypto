import React, { PureComponent } from "react";
import { Button } from "react-bootstrap";

import ChartMaker from "./ChartMaker";

export default class ChartGather extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { all: [] };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = async () => {
    const response = await fetch("/getall");
    const data = await response.json();

    this.setState({ all: this.prepareData(data["bpi"]) });
  };

  prepareData = data => {
    var result = [];

    for (var i in data) {
      result.push({ date: i, price: data[i] });
    }
    return result;
  };

  render() {
    return (
      <div>
        <ChartMaker data={this.state.all} currency="$" />
      </div>
    );
  }
}
