import React, { PureComponent } from "react";
import { ListGroup } from "react-bootstrap";

export default class MediaBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
  }

  render() {
    return (
      <ListGroup>
        <ListGroup.Item>{this.state.text}</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    );
  }
}
