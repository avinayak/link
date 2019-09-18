import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Carousel extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to The Link</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
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
      </div>
    );
  }
}

export default Carousel;
