import React, { Component } from "react";
import { ListGroupItem, Image } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

export default class MediaContent extends Component {
  //clear the source url
  extractHostname = url => {
    var hostname;

    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }
    hostname = hostname.split(":")[0];
    hostname = hostname.split("?")[0];

    return hostname.includes("www.") ? hostname : "www." + hostname;
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
                  <Col sm={3} md={3} lg={3} className="centered">
                    <Image
                      width={50}
                      height={50}
                      src={
                        item.imgUrl
                          ? item.imgUrl
                          : require("../assets/images/bitcoinlogo.png")
                      }
                      fluid
                      roundedCircle={this.props.iconCircled}
                    />
                  </Col>

                  <Col sm={9} md={9} lg={9}>
                    <Row>
                      <span className="articleTitle">{item.title}</span>
                    </Row>
                    <Row>
                      <span className="sourceText">
                        {this.extractHostname(item.url)}
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
