import React, { Component } from "react";
import Home from "../screens/Home.js";
import Indicators from "../screens/Indicators.js";
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const logo = require("../assets/images/logo.png");
const bitcoin = require("../assets/images/bitcoin.png");

export default class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar
            collapseOnSelect
            expand="lg"
            variant="light"
            style={{ backgroundColor: "#ecf1f9" }}
          >
            <Navbar.Brand href="/">
              <img
                alt="mrcrypto logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              <span className="logoName">MrCrypto</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/indicators">Indicators</Nav.Link>
              </Nav>
              <span class="navbar-text">
                <img alt="bitcoin" src={bitcoin} width="30" height="30" />{" "}
                <span className="bitcoinTool">Bitcoin Tool</span>
              </span>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/indicators">
              <Indicators />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
