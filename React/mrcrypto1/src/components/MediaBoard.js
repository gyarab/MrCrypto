import React, { Component } from "react";
import { ListGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";

export default class MediaBoard extends Component {
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

    return hostname.includes("www.") ? hostname : "www" + hostname;
  };

  render() {
    return (
      <ListGroup>
        <ListGroup.Item>
          <div className="centered">
            <FontAwesomeIcon
              icon={this.props.iconName}
              color={this.props.color}
              size="2x"
            />
            <font className="brandText spaceLeft">{this.props.text}</font>
          </div>
        </ListGroup.Item>

        {this.props.data.map((item, i) => {
          return (
            <ListGroup.Item
              key={i}
              action
              style={{ padding: "1rem 0" }} /**override bootstrap**/
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
                      roundedCircle
                    />
                  </Col>

                  <Col sm={9} md={9} lg={9}>
                    <Row>
                      <font className="articleTitle">{item.title}</font>
                    </Row>
                    <Row>
                      <font className="sourceText">
                        {this.extractHostname(item.url)}
                      </font>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}
