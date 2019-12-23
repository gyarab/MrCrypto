import React, { Component } from "react";
import ChartMaker from "../components/ChartMaker";
import { Container, Row, Col } from "react-bootstrap";
import MediaBoard from "../components/MediaBoard";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [], twitter: [], reddit: [] };
  }

  componentDidMount() {
    this.getNews();
  }

  getNews = async () => {
    const response = await fetch("/news");
    const data = await response.json();
    this.setState({ news: data });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ChartMaker />
          </Col>
        </Row>

        <Row>
          <Col>
            <MediaBoard
              category="News"
              iconName="globe-europe"
              color="#00B1B5"
              data={this.state.news}
              iconCircled={false}
            />
          </Col>

          <Col>
            <MediaBoard
              category="Twitter"
              iconName={["fab", "twitter"]}
              color="#1C9BEA"
              data={this.state.twitter}
              iconCircled={true}
            />
          </Col>

          <Col>
            <MediaBoard
              category="Reddit"
              iconName={["fab", "reddit"]}
              color="#F7541D"
              data={this.state.reddit}
              iconCircled={true}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
