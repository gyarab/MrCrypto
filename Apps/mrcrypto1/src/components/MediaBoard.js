import React, { Component } from "react";
import { Accordion, Button } from "react-bootstrap";

import MediaContent from "./MediaContent";
import MediaTop from "./MediaTop";
import Indicator from "./Indicator";

export default class MediaBoard extends Component {
  render() {
    return (
      <div>
        {/*header*/}
        <MediaTop
          iconName={this.props.iconName}
          color={this.props.color}
          category={this.props.category}
        />

        {this.props.fetched ? null : <Indicator />}

        {/*uncollapsable part (first 5)*/}
        <MediaContent
          data={this.props.data.slice(0, 5)}
          iconCircled={this.props.iconCircled}
        />

        {/*collapsable part*/}
        <Accordion defaultActiveKey="1">
          <Accordion.Collapse eventKey="0">
            <MediaContent
              data={this.props.data.slice(5)}
              iconCircled={this.props.iconCircled}
            />
          </Accordion.Collapse>

          {/*toggle button*/}
          <Accordion.Toggle
            as={Button}
            onClick={this.props.toggle}
            className="toggleButton"
            variant="light"
            size="sm"
            eventKey="0"
          >
            <span className="toggleText">
              {this.props.opened ? "See less" : "See more"}
            </span>
          </Accordion.Toggle>
        </Accordion>
      </div>
    );
  }
}
