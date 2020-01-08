import React, { Component } from "react";
import { ListGroupItem, Spinner } from "react-bootstrap";

export default class MediaTop extends Component {
  render() {
    return (
      <ListGroupItem>
        <div className="centered">
          <Spinner animation="border" variant="secondary" />
        </div>
      </ListGroupItem>
    );
  }
}
