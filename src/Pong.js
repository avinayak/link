import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import "p5/lib/addons/p5.sound";

function sketch(p) {
  let width = 320,
    height = 480;
  let host = null;
  let lastx = -1;
  let lasty = -1;
  let sound = null;
  let paddleHeight = 20;
  let paddleWidth = 60;
  let puckWidth = 10;
  let selfPaddle, oppPaddle, puck;
  let selfPoints = 0;
  let oppPoints = 0;
  let hostLostLast = true;
  let veiled = true;
  let selfReady = false;
  let oppReady = false;
  let maxPoints = 11;
  let collisionBoot = 1.1;

  let createPuck = () => {
    let _puck = {
      x: width / 2,
      y: height / 2,
      vx: 0, //5.1, //4 + Math.random() * 5 * (Math.random() >= 0.5 ? -1 : 1),
      vy: 0 //5.1*(hostLostLast?-1:1) //4 + Math.random() * 5
    };
    _puck.show = () => {
      p.rect(_puck.x, _puck.y, puckWidth, puckWidth);
    };

    _puck.resetPuck = () => {
      _puck.x = width / 2;
      _puck.y = height / 2;
      _puck.vx =
        (2 + (Math.random() * 5 * (selfPoints + oppPoints)) / (maxPoints * 2)) *
        (Math.random() >= 0.5 ? -1 : 1);
      _puck.vy =
        (2.1 +
          (Math.random() * 5 * (selfPoints + oppPoints)) / (maxPoints * 2)) *
        (hostLostLast ? -1 : 1);
    };
    _puck.update = () => {
      if (_puck.x > width || _puck.x < 0) {
        _puck.vx = -_puck.vx;
        sound.play();
      }
      if (_puck.y > height - paddleHeight / 2) {
        if (
          _puck.x > selfPaddle.x - paddleWidth / 2 &&
          _puck.x < selfPaddle.x + paddleWidth / 2
        ) {
          _puck.vy = -_puck.vy*(collisionBoot);
         // _puck.vx += _puck.vx * Math.random();
          _puck.y = height - paddleHeight / 2;
          sound.play();
        } else {
          hostLostLast = true;
          oppPoints += 1;
          p.sendScore(selfPoints, oppPoints);
          _puck.resetPuck();
          veiled = true;
          oppReady = false;
          selfReady = false;
        }
      }

      if (_puck.y < paddleHeight / 2) {
        if (
          _puck.x > oppPaddle.x - paddleWidth / 2 &&
          _puck.x < oppPaddle.x + paddleWidth / 2
        ) {
          _puck.vy = -_puck.vy*(collisionBoot);
          // _puck.vx += _puck.vx * Math.random();
          _puck.y = paddleHeight / 2;
          sound.play();
        } else {
          hostLostLast = false;
          selfPoints += 1;
          p.sendScore(selfPoints, oppPoints);
          _puck.resetPuck();
          veiled = true;
          oppReady = false;
          selfReady = false;
        }
      }
      _puck.x += _puck.vx;
      _puck.y += _puck.vy;
    };
    return _puck;
  };

  let printPoints = () => {
    p.push();
    p.translate(20, height / 2);
    p.rotate(p.radians(-90));
    p.textSize(22);
    p.text(
      `${("00" + selfPoints).slice(-2)}   ${("00" + oppPoints).slice(-2)}`,
      -35,
      0
    );
    p.pop();
  };

  let readyMessage = () => {
    if (!selfReady) {
      p.push();
      p.textSize(22)
      p.textAlign(p.CENTER);
      p.text("👆 if ready", width / 2, height * 0.75);
      p.pop();
    }
    if (!oppReady) {
      p.push();
      p.textAlign(p.CENTER);
      p.translate(width / 2, height * 0.25);
      p.textSize(22)
      p.rotate(p.radians(180));
      p.text("👆 if ready", 0, 0);
      p.pop();
    }
  };

  let createPaddle = (pWidth, isSelf) => {
    let paddle = {
      pWidth,
      x: width / 2,
      y: isSelf ? height : 0
    };
    paddle.show = () => {
      p.fill(255);
      p.noStroke();
      p.rect(paddle.x, paddle.y, pWidth - puckWidth, paddleHeight);
    };
    return paddle;
  };

  p.setup = function() {
    sound = p.loadSound("./hit.mp3");
    p.createCanvas(width, height);
    p.background(4);
    p.rectMode(p.CENTER);
    selfPaddle = createPaddle(paddleWidth, true);
    oppPaddle = createPaddle(paddleWidth, false);
    // puck = createPuck();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    if (veiled && props.oppReady) {
      oppReady = props.oppReady;
    }
    if (oppReady && selfReady && veiled) {
      veiled = false;
      oppReady = false;
      selfReady = false;
      puck.resetPuck();
    }

    if (!puck) {
      host = props.host;
      p.sendData = props.sendData;
      p.sendScore = props.sendScore;
      p.sendReady = props.sendReady;
      puck = createPuck();
    }
    if (!host) {
      puck.x = width - props.x;
      puck.y = height - props.y;
    }

    if (props.selfPoints > selfPoints || props.oppPoints > oppPoints) {
      selfPoints = props.selfPoints;
      oppPoints = props.oppPoints;
      veiled = true;
      oppReady = false;
      selfReady = false;
    }
    oppPaddle.x = width - props.px;
  };

  p.mouseClicked = () => {
    if (!selfReady) {
      p.sendReady();
      selfReady = true;
    }
  };

  p.mouseDragged = function() {
    if (p.mouseX > paddleWidth / 2 && p.mouseX < width - paddleWidth / 2)
      selfPaddle.x = p.mouseX;
  };

  p.draw = function() {
    p.background(0);
    p.stroke(255);

    p.line(0, height / 2, width, height / 2);
    printPoints();
    p.noStroke();
    //oppPaddle.x = lastx == -1 ? width / 2 : lastx;
    selfPaddle.show();
    oppPaddle.show();
    //p.text(`${puck.x}${puck.y}${oppPaddle.x}`)
    if (puck && !veiled) {
      if (host) {
        puck.update();
        p.sendData(puck.x, puck.y, selfPaddle.x);
      } else {
        p.sendData(null, null, selfPaddle.x);
      }
      puck.show();
    } else {
      if (selfPoints >= maxPoints || oppPoints >= maxPoints) {
        p.push();
        p.textAlign(p.CENTER);
        p.textSize(33);
        p.text(
          selfPoints > oppPoints ? "You Win 😎✌" : "😭",
          width / 2,
          height * 0.75
        );
        p.pop();
      } else readyMessage();
      p.background(90, 90, 90, 120);
    }
  };
}

export class Pong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: null,
      y: null,
      px: null,
      selfPoints: 0,
      oppPoints: 0
    };
  }

  componentDidMount() {
    this.props.dataChannel.addEventListener("message", event => {
      let data = JSON.parse(event.data);

      if (data.from !== this.props.roomKey && data.type != "ready") {
        this.setState({ ...data.data, oppReady: false });
      }
      if (data.type == "ready" && data.from !== this.props.roomKey) {
        this.setState({ oppReady: true });
      }
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <P5Wrapper
          sketch={sketch}
          host={this.props.host}
          selfPoints={this.state.oppPoints}
          oppPoints={this.state.selfPoints}
          x={this.state.x}
          y={this.state.y}
          px={this.state.px}
          oppReady={this.state.oppReady}
          sendReady={() => {
            let message = {
              data: { ready: true },
              type: "ready",
              from: this.props.roomKey
            };
            this.props.dataChannel.send(JSON.stringify(message));
          }}
          sendScore={(selfPoints, oppPoints) => {
            let message = {
              data: { selfPoints, oppPoints },
              type: "score",
              from: this.props.roomKey
            };
            this.props.dataChannel.send(JSON.stringify(message));
          }}
          sendData={(x, y, px) => {
            this.setState({ oppReady: false });
            let message = {
              data: { x, y, px },
              type: "data",
              from: this.props.roomKey
            };
            this.props.dataChannel.send(JSON.stringify(message));
          }}
        />
      </div>
    );
  }
}

export default Pong;
