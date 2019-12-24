import React, { Component } from "react";
import ChartMaker from "../components/ChartMaker";
import { Container, Row, Col } from "react-bootstrap";
import MediaBoard from "../components/MediaBoard";

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
          <Col sm={12} lg={4}>
            <MediaBoard
              category="News"
              iconName="globe-europe"
              color="#00B1B5"
              data={this.props.news}
              iconCircled={false}
            />
          </Col>

          <Col sm={12} lg={4}>
            <MediaBoard
              category="Twitter"
              iconName={["fab", "twitter"]}
              color="#1C9BEA"
              data={[]}
              iconCircled={true}
            />
          </Col>

          <Col sm={12} lg={4}>
            <MediaBoard
              category="Reddit"
              iconName={["fab", "reddit"]}
              color="#F7541D"
              data={[]}
              iconCircled={true}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const { news } = state;
  return { news: news.data };
}
export default connect(mapStateToProps)(Home);
