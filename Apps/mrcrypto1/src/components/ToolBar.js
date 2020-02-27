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
    const indicators = ["sma", "wma", "ema", "tma", "bob"];
    const intervals = ["hour", "day", "month", "all"];

    const handleToggle = indicators => {
      this.props.setToggled(indicators);
    };
    const handleGoogleToggle = () => {
      this.props.toggleGoogle();
    };

    let variant = "light";
    let icon = name => {
      return (
        <FontAwesomeIcon
          icon={faCircle}
          color={colors[name]}
          style={{ paddingRight: 3 }}
        />
      );
    };
    let indicatorButton = name => {
      return (
        <ToggleButton variant={variant} value={name}>
          {icon(name)}
          {name.toUpperCase()}
        </ToggleButton>
      );
    };
    let intervalButton = (key, i) => {
      return (
        <ToggleButton
          variant={variant}
          onClick={() => {
            this.props.select(key);
          }}
          value={i}
        >
          {key.toUpperCase()}
        </ToggleButton>
      );
    };

    return (
      <Row className="justify-content-md-center">
        <Col xs lg="7">
          <ToggleButtonGroup
            size="sm"
            type="checkbox"
            className="mb-2"
            onChange={handleToggle}
          >
            {indicators.map(name => {
              return indicatorButton(name);
            })}
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
        <Col xs lg="3">
          <ToggleButtonGroup
            size="sm"
            type="radio"
            name="intervals"
            defaultValue={2}
          >
            {intervals.map((key, i) => {
              return intervalButton(key, i);
            })}
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
