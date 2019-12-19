import React, { Component, Button } from "react";
import ChartBoard from "../components/ChartBoard";
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
            <ChartBoard />
          </Col>
        </Row>

        <Row>
          <Col>
            <MediaBoard text="News" data={this.state.news} />
          </Col>

          <Col>
            <MediaBoard text="Twitter" data={this.state.twitter} />
          </Col>

          <Col>
            <MediaBoard text="Reddit" data={this.state.reddit} />
          </Col>
        </Row>
      </Container>
    );
  }
}
