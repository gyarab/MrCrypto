import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRange } from "../redux/actions/prices";

import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

class ToolBar extends Component {
  render() {
    return (
      <div>
        <ToggleButtonGroup type="radio" name="intervals" defaultValue={2}>
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
      </div>
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
