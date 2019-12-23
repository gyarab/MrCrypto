import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  toggleNews,
  toggleTwitter,
  toggleReddit
} from "../redux/actions/toggle";
import { connect } from "react-redux";

class MediaToggler extends Component {
  render() {
    return (
      <div>
        <ListGroupItem
          action
          onClick={() => {
            this.props.toggleNews();
          }}
        >
          <div className="lastItem">
            <span className="toggleText">View more</span>
            <FontAwesomeIcon icon="chevron-right" color="#aaa" size="sm" />
          </div>
        </ListGroupItem>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleNews: () => {
      dispatch(toggleNews);
    },
    toggleTwitter: () => {
      dispatch(toggleTwitter);
    },
    toggleReddit: () => {
      dispatch(toggleReddit);
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(MediaToggler);
