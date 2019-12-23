import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class MediaTop extends Component {
  render() {
    return (
      <div>
        <ListGroupItem>
          <div className="centered">
            <FontAwesomeIcon
              icon={this.props.iconName}
              color={this.props.color}
              size="2x"
            />
            <span className="brandText spaceLeft">{this.props.category}</span>
          </div>
        </ListGroupItem>
      </div>
    );
  }
}
