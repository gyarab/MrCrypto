import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRange } from "../redux/actions/prices";
import { setActive } from "../redux/actions/indicators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { toggle } from "../redux/actions/googletrends";

var colors = require("./indicatorsColors.json");

class ToolBar extends Component {
  render() {
    const handleToggle = indicators => {
      this.props.setToggled(indicators);
    };
    const handleGoogleToggle = () => {
      this.props.toggleGoogle();
    };

    let icon = name => {
      return (
        <FontAwesomeIcon
          icon={faCircle}
          color={colors[name]}
          style={{ paddingRight: 3 }}
        />
      );
    };
    let variant = "light";

    return (
      <Row className="d-flex justify-content-around">
        <Col md={6} xs={6} lg={6}>
          <ToggleButtonGroup
            size="sm"
            type="checkbox"
            className="mb-2"
            onChange={handleToggle}
          >
            <ToggleButton variant={variant} value="sma">
              {icon("sma")}SMA
            </ToggleButton>
            <ToggleButton variant={variant} value="ema">
              {icon("ema")}EMA
            </ToggleButton>
            <ToggleButton variant={variant} value="tma">
              {icon("tma")}TMA
            </ToggleButton>
            <ToggleButton variant={variant} value="wma">
              {icon("wma")}WMA
            </ToggleButton>
            <ToggleButton variant={variant} value="bob">
              {icon("bob")}BOB
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            type="checkbox"
            name="google"
            size="sm"
            className="mb-2"
          >
            <ToggleButton variant={variant} onChange={handleGoogleToggle}>
              {icon("googletrends")}Google Trends
            </ToggleButton>
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
    },
    toggleGoogle: () => {
      dispatch(toggle());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar);
