import React, { Component } from "react";
import StatisticTableMaker from "./StatisticTableMaker";
import { Col, Row } from "react-bootstrap";

//md={10} xs={10} lg={10}
export default class StatisticTable extends Component {
  render() {
    return (
        <Col as={StatisticTableMaker} />
    );
  }
}
