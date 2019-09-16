import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";

function sketch(p) {
  let rotation = 0;
  let width = 0;
  let height = 0;
  let lastx = 0;
  let lasty = 0;

  p.setup = function() {
    //console.log(window.innerWidth - 30);
    
    width = window.innerWidth - 30 < 536 ? window.innerWidth - 30 : 536;
    height = width;
    p.createCanvas(width, width, p.WEBGL);
    p.background(4);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    p.sendDragged = props.sendDragged;
    if(props.rx != lastx || props.ry != lasty) {
      lastx = props.rx;
      lasty = props.ry;
    }
  };

  p.mouseDragged = function(props) {
    p.noStroke();
    p.ellipse(p.mouseX, p.mouseY, 2);
    p.sendDragged(p.mouseX, p.mouseY);
  };
  var i = 0;
  p.draw = function() {
    p.noStroke();
    p.translate(-width / 2, -height / 2);
    p.ellipse(lastx, lasty, 2);
    i += 1;
    p.rect(5, 5 * 2, 1, 1);
  };
}

export class SolarSailer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      x:0,
      y:0
    }
  }

  componentDidMount() {
    this.props.dataChannel.addEventListener("message", event => {
      this.setState(JSON.parse(event.data))
    });
  }

  render() {
    return (
      <div>
        <br />
        {JSON.stringify(this.state)}
        <P5Wrapper sketch={sketch} rx={this.state.x} ry={this.state.y} sendDragged={(x, y) => {
          this.props.dataChannel.send(JSON.stringify({x,y}))
        }} />
        Latency Test 1
      </div>
    );
  }
}

export default SolarSailer;
