import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRange } from "../redux/actions/prices";
import { setActive } from "../redux/actions/indicators";

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
    const handleToggle = indicators => {
      console.log(indicators);
      this.props.setToggled(indicators);
    };

    return (
      <Row className="d-flex justify-content-around">
        <Col md={3} xs={3} lg={3}>
          <ToggleButtonGroup
            size="sm"
            type="checkbox"
            className="mb-2"
            onChange={handleToggle}
          >
            <ToggleButton value="sma">SMA</ToggleButton>
            <ToggleButton value="ema">EMA</ToggleButton>
            <ToggleButton value="tma">TMA</ToggleButton>
            <ToggleButton value="wma">WMA</ToggleButton>
            <ToggleButton value="bob">BOB</ToggleButton>
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
    selected: prices.selected
  };
}
function mapDispatchToProps(dispatch) {
  return {
    select: range => {
      dispatch(selectRange(range));
    },
    setToggled: indicators => {
      dispatch(setActive(indicators));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar);
