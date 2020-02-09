import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRange } from "../redux/actions/prices";

import {
  Container,
  Row,
  Col,
  Colum,
  ToggleButton,
  ToggleButtonGroup,
  Dropdown
} from "react-bootstrap";

class ToolBar extends Component {
  render() {
    return (
      <Row className="d-flex justify-content-around">
        <Col md={3} xs={3} lg={3}>
          <ToggleButtonGroup size="sm" type="checkbox" className="mb-2">
            <ToggleButton value={1}>SMA</ToggleButton>
            <ToggleButton value={2}>EMA</ToggleButton>
            <ToggleButton value={3}>BOB</ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col md={3} xs={3} lg={3}>
          <ToggleButtonGroup
            size="sm"
            type="radio"
            name="intervals"
            defaultValue={2}
          >
            <ToggleButton
              onClick={() => {
                this.props.select("hour");
              }}
              value={1}
            >
              Hour
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                this.props.select("day");
              }}
              value={2}
            >
              Day
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                this.props.select("month");
              }}
              value={3}
            >
              Month
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                this.props.select("all");
              }}
              value={4}
            >
              All
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  let prices = state.prices;
  return {
    selected: prices.selected,
    currency: prices.currency
  };
}
function mapDispatchToProps(dispatch) {
  return {
    select: range => {
      dispatch(selectRange(range));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar);
