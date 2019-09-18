import React, { Component } from "react";
import {
  XYPlot,
  VerticalGridLines,
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines
} from "react-vis";

export class Latte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ping: 0,
      lats: []
    };
  }

  componentDidMount() {
    this.props.dataChannel.addEventListener("message", event => {
      console.log(event.data);
      if (event.data == "PONG") {
        console.log("PONG", new Date().getTime() - this.state.ping);
        this.setState({
          lats: this.state.lats.concat([new Date().getTime() - this.state.ping])
        });
      }
      if (event.data == "PING") {
        this.props.dataChannel.send("PONG");
      }
    });
    setInterval(() => {
      var ping = new Date().getTime();
      this.setState({ ping });
      this.props.dataChannel.send("PING");
    }, 2000);
  }

  render() {
    return (
      <div>
        <p>Min: {Math.min(...this.state.lats)} ms</p>
        <p>
          Average:{" "}
          {Math.round(this.state.lats.reduce(
            (previous, current) => (current += previous),
            0
          ) / this.state.lats.length) }{" ms"}
        </p>
        <p>Max: {Math.max(...this.state.lats)} ms</p>
        <XYPlot height={300} width={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
          animation
            data={this.state.lats.map((y, x) => ({
              x,
              y
            }))}
          />
        </XYPlot>
      </div>
    );
  }
}

export default Latte;
