import React, { Component } from "react";
import { ListGroupItem, Image } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

export default class MediaContent extends Component {
  //clear the source url
  extractHostname = url => {
    var hostname;
    try {
      if (url.indexOf("//") > -1) {
        hostname = url.split("/")[2];
      } else {
        hostname = url.split("/")[0];
      }
      hostname = hostname.split(":")[0];
      hostname = hostname.split("?")[0];

      return hostname.includes("www.") ? hostname : "www." + hostname;
    } catch {
      return url;
    }
  };

  render() {
    return (
      <div>
        {this.props.data.map((item, i) => {
          return (
            <ListGroupItem
              key={i}
              action
              style={{ padding: "1rem 0" }}
              className="regularItem"
              onClick={() => window.open(item.url, "_blank")}
            >
              <Container>
                <Row>
                  <Col xs={4} sm={4} lg={3} className="centered">
                    <Image
                      src={
                        item.imgUrl
                          ? item.imgUrl
                          : require("../assets/images/bitcoin.png")
                      }
                      fluid
                      roundedCircle={this.props.iconCircled}
                    />
                  </Col>

                  <Col>
                    <Row>
                      <span className="articleTitle">{item.title}</span>
                    </Row>
                    <Row>
                      <span className="sourceText">
                        {item.autor || this.extractHostname(item.url)}
                      </span>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </ListGroupItem>
          );
        })}
      </div>
    );
  }
}
