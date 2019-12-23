import React, { Component } from "react";
import { ListGroup, Accordion, Button } from "react-bootstrap";
import { connect } from "react-redux";

import MediaContent from "./MediaContent";
import MediaToggler from "./MediaToggler";
import MediaTop from "./MediaTop";

class MediaBoard extends Component {
  render() {
    return (
      <ListGroup>
        <MediaTop
          iconName={this.props.iconName}
          color={this.props.color}
          category={this.props.category}
        />
        <Accordion defaultActiveKey="0">
          <Accordion.Collapse eventKey="0">
            <MediaContent
              data={this.props.data}
              iconCircled={this.props.iconCircled}
            />
          </Accordion.Collapse>

          <Accordion.Toggle
            onClick={() => console.log("kliknuto")}
            variant="link"
            eventKey="0"
          >
            <MediaToggler />
          </Accordion.Toggle>
        </Accordion>
      </ListGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    openedNews: state.media.openedNews
  };
}

export default connect(mapStateToProps)(MediaBoard);
