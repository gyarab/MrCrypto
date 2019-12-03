import React, { Component } from "react";
import ChartMaker from "../components/ChartMaker";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }
  componentDidMount = () => {
    fetch("/get")
      .then(res => {
        return res.json();
      })
      .then(users => {
        this.setState({ users });
      });
  };

  render() {
    return <ChartMaker />;
  }
}
