import React, { PureComponent } from "react";
import { ListGroup, Image } from "react-bootstrap";

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
        <ListGroup.Item active>{this.state.text}</ListGroup.Item>

        {this.props.data.map((item, i) => {
          return (
            <ListGroup.Item
              action
              onClick={() => window.open(item.url, "_blank")}
            >
              <Image
                width={50}
                height={50}
                src={
                  item.imgUrl
                    ? item.imgUrl
                    : require("../assets/images/bitcoinlogo.png")
                }
                roundedCircle
              />
              {item.title}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
