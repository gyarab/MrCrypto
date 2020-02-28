import React, { Component } from "react";
import Home from "../screens/Home.js";
import Indicators from "../screens/Indicators.js";
import NeuralNetwork from "../screens/NeuralNetwork.js";
import { Navbar, Nav } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">MrCrypto</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/neuralnetwork">Neural Network</Nav.Link>
                <Nav.Link href="/indicators">Indicators</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/indicators">
              <Indicators />
            </Route>
            <Route path="/neuralnetwork">
              <NeuralNetwork />
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

function About() {
  return <h2>About</h2>;
}
