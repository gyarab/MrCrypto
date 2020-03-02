import React, { Component } from "react";
import { connect } from "react-redux";
import { selectRange } from "../redux/actions/prices";
import { setActive } from "../redux/actions/indicators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  ToggleButton,
  ToggleButtonGroup,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { toggle } from "../redux/actions/googletrends";

const names = require("../json/indicatorsNames.json");
const colors = require("../json/indicatorsColors.json");
const lists = require("../json/lists.json");

class ToolBar extends Component {
  render() {
    const indicators = lists.indicators;
    const periods = lists.periods;

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
    let round = value => {
      return Math.round(value * 100) / 100;
    };
    let intervals = this.props.intervals;
    let selected = this.props.selected;
    let currency = this.props.currency;

    //actual price now
    let actualPrice = 0;
    let hourPeriod = intervals.hour;

    actualPrice = hourPeriod[hourPeriod.length - 1].close;
    actualPrice = Math.round(actualPrice * 100) / 100;

    //price at the start of the selected period
    let selectedPeriod = intervals[selected];
    let lastPrice = selectedPeriod[0].close;

    //percentage (fall/rise)
    let percentage = Math.abs(actualPrice / lastPrice - 1) * 100;
    percentage = round(percentage);

    //difference and spliting sign before dollar sign
    let difference = actualPrice - lastPrice;
    difference = round(difference);

    let sign = difference < 0 ? "-" : "+";
    let color = difference < 0 ? "#DE5F67" : "#05B169";
    difference = Math.abs(difference);
    //result
    let message = `${sign + currency + difference} (${percentage}%)`;

    let indicatorButton = name => {
      return (
        <ToggleButton key={name} variant={variant} value={name}>
          {icon(name)}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{names[name]}</Tooltip>}
          >
            <span>{name.toUpperCase()}</span>
          </OverlayTrigger>
        </ToggleButton>
      );
    };
    let intervalButton = (key, i) => {
      return (
        <ToggleButton
          key={key}
          variant={variant}
          onClick={() => {
            this.props.select(key);
          }}
          value={i}
        >
          <span>{key.toUpperCase()}</span>
        </ToggleButton>
      );
    };

    return (
      <Container>
        <Row className="centered">
          <span className="price">${actualPrice}</span>
          <span style={{ color }} className="difference">
            {message}
          </span>
        </Row>

        <Row className="justify-content-md-center centered">
          <Col xs={7}>
            <span className="toolText">Indicators </span>
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
              size="sm"
              type="checkbox"
              name="google"
              className="mb-2"
            >
              <ToggleButton variant={variant} onChange={handleGoogleToggle}>
                {icon("googletrends")}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      Google trends analyzes the popularity of searching word
                      "Bitcoin" and it compares the search volume of different
                      queries over time on scale from 0-100.
                    </Tooltip>
                  }
                >
                  <span>Google Trends</span>
                </OverlayTrigger>
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
          <Col xs={2.6}>
            <span className="toolText">Periods </span>
            <ToggleButtonGroup
              size="sm"
              type="radio"
              name="intervals"
              className="mb-2"
              defaultValue={1}
            >
              {periods.map((key, i) => {
                return intervalButton(key, i);
              })}
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  let prices = state.prices;
  return {
    selected: prices.selected,
    intervals: prices.intervals,
    currency: prices.currency
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
