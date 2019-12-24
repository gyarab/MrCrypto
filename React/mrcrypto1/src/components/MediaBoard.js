import React, { Component } from "react";
import { Accordion, Button } from "react-bootstrap";
import { connect } from "react-redux";

import MediaContent from "./MediaContent";
import MediaTop from "./MediaTop";

class MediaBoard extends Component {
  render() {
    return (
      <div>
        {/*header*/}
        <MediaTop
          iconName={this.props.iconName}
          color={this.props.color}
          category={this.props.category}
        />

        {/*uncollapsable part*/}
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
            style={{
              marginTop: "-10px",
              marginLeft: "10px",
              btnFocus: {
                outline: "none"
              }
            }}
            variant="light"
            size="sm"
            eventKey="0"
          >
            <span className="sourceText">See more..</span>
          </Accordion.Toggle>
        </Accordion>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(MediaBoard);
