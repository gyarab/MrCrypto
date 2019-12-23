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
              text="News"
              iconName="globe-europe"
              color="#495057"
              data={this.state.news}
            />
          </Col>

          <Col>
            <MediaBoard
              text="Twitter"
              iconName={["fab", "twitter"]}
              color="#1C9BEA"
              data={this.state.twitter}
            />
          </Col>

          <Col>
            <MediaBoard
              text="Reddit"
              iconName={["fab", "reddit"]}
              color="#F7541D"
              data={this.state.reddit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
