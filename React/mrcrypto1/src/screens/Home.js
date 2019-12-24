import React, { Component } from "react";
import ChartMaker from "../components/ChartMaker";
import { Container, Row, Col } from "react-bootstrap";
import MediaBoard from "../components/MediaBoard";
import {
  toggleNews,
  toggleTwitter,
  toggleReddit
} from "../redux/actions/toggle";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ChartMaker />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} lg={4}>
            <MediaBoard
              category="News"
              iconName="globe-europe"
              color="#00B1B5"
              data={this.props.news}
              iconCircled={false}
              opened={this.props.newsOpened}
              toggle={this.props.toggleNews}
            />
          </Col>

          <Col xs={12} sm={6} lg={4}>
            <MediaBoard
              category="Twitter"
              iconName={["fab", "twitter"]}
              color="#1C9BEA"
              data={this.props.twitter}
              iconCircled={true}
              opened={this.props.twitterOpened}
              toggle={this.props.toggleTwitter}
            />
          </Col>

          <Col xs={12} sm={6} lg={4}>
            <MediaBoard
              category="Reddit"
              iconName={["fab", "reddit"]}
              color="#F7541D"
              data={this.props.reddit}
              iconCircled={false}
              opened={this.props.redditOpened}
              toggle={this.props.toggleReddit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const { news, twitter, reddit, toggling } = state;
  return {
    news: news.data,
    twitter: twitter.data,
    reddit: reddit.data,
    newsOpened: toggling.news,
    twitterOpened: toggling.twitter,
    redditOpened: toggling.reddit
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toggleNews: () => dispatch(toggleNews),
    toggleTwitter: () => dispatch(toggleTwitter),
    toggleReddit: () => dispatch(toggleReddit)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
