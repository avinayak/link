import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

export class Carousel extends Component {
  render() {
    return (
      <Container maxWidth={"sm"}>
        <h2>Welcome to The Link</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/robots"} className="nav-link">
                Robots
              </Link>
            </li>
            <li>
              <Link to={"/draw"} className="nav-link">
                Draw Demo
              </Link>
            </li>
            <li>
              <Link to={"/latte"} className="nav-link">
                Latency tester
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    );
  }
}

export default Carousel;
