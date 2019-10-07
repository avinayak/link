import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import "p5/lib/addons/p5.sound";

export class Robots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: -1,
      y: -1,
      turn: !this.props.host
    };
  }

  componentDidMount() {
    this.props.dataChannel.addEventListener("message", event => {
      let data = JSON.parse(event.data);

      if (data.from !== this.props.roomKey) {
        
        this.setState({
          turn: !this.state.turn,
          x: data.payload.x,
          y: data.payload.y
        });
      }
    });
  }

  sendMove = cell => {
    let data = { payload: cell, from: this.props.roomKey, type: "data" };
    
    this.props.dataChannel.send(JSON.stringify(data));
    this.setState({ turn: !this.state.turn });
  };



  sketch = p => {
    let WIDTH = 8;
    let HEIGHT = 10;
    let CRITICAL_MASS = 4;
    let width = p.windowWidth;
    let cellSpacing =
      p.windowWidth < p.windowHeight ? (width - 20) / WIDTH : width / 3 / WIDTH;
    let turn = 0;
    let networkTurn = 0;
    let progressHeight = 15;
    let colors = ["#ffffff","#111111"];//["#55b2e0", "#FF4301"];
    let robotRadius = cellSpacing * 0.36;
    let marginX =
      p.windowWidth < p.windowHeight ? 10 : (width - WIDTH * cellSpacing) / 2;
    let marginY = 10;
    let height = cellSpacing * HEIGHT + marginY + progressHeight;
    let subSpacing = cellSpacing * 0.21;
    let easing = 0.5;
    let grid = [];
    let opx = -1;
    let opy = -1;
    let song = null;
    let selfPlayed = false;
    let opponentPlayed = false;
    let isGameOver = false;
    let scores = [0, 0];
    let font;

    let initGrid = () => {
      for (var i = 0; i < HEIGHT; i++) {
        grid[i] = new Array(WIDTH);
        for (var j = 0; j < WIDTH; j++) {
          grid[i][j] = [];
        }
      }
    };

   let drawDots = () => {
     p.fill(255);
     p.noStroke();
     
      for(let i=0;i<=WIDTH;i++){
        for(let j=0;j<=HEIGHT;j++){
          p.ellipse(i*cellSpacing+marginX, j*cellSpacing+marginY, 2);
        } 
      }
    }

    let drawLines = () => {
      for (let i = 0; i < WIDTH + 1; i++) {
        p.line(
          marginX + i * cellSpacing,
          marginY,
          marginX + i * cellSpacing,
          marginY + HEIGHT * cellSpacing
        );
      }
      for (let i = 0; i < HEIGHT + 1; i++) {
        p.line(
          marginX,
          marginY + i * cellSpacing,
          marginX + WIDTH * cellSpacing,
          marginY + i * cellSpacing
        );
      }
    };
    let switchTurn = () => {
      turn = (turn + 1) % 2;
    };
    let criticalMass = cell => {
      if (
        (cell.x == 0 || cell.x == WIDTH - 1) &&
        (cell.y == 0 || cell.y == HEIGHT - 1)
      )
        return CRITICAL_MASS - 2;
      else if (
        cell.x == 0 ||
        cell.x == WIDTH - 1 ||
        (cell.y == 0 || cell.y == HEIGHT - 1)
      )
        return CRITICAL_MASS - 1;
      else return CRITICAL_MASS;
    };

    let pixelToGrid = (x, y) => {
      return {
        x: Math.floor((x - marginX) / cellSpacing),
        y: Math.floor((y - marginY) / cellSpacing)
      };
    };

    let gridToPixel = cell => {
      let subOffset = { x: 10, y: 10 };
      let mass = grid[cell.y][cell.x].length;
      if (mass == 0) {
        subOffset = { x: -subSpacing, y: subSpacing };
      } else if (mass == 1) {
        subOffset = { x: -subSpacing, y: -subSpacing };
      } else if (mass == 2) {
        subOffset = { x: subSpacing, y: -subSpacing };
      } else if (mass == 3) {
        subOffset = { x: subSpacing, y: subSpacing };
      }
      return {
        x: cell.x * cellSpacing + cellSpacing / 2 + marginX + subOffset.x,
        y: cell.y * cellSpacing + cellSpacing / 2 + marginY + subOffset.y
      };
    };

    let calculateScore = () => {
      let _scores = [0, 0];
      for (var i = 0; i < HEIGHT; i++) {
        for (var j = 0; j < WIDTH; j++) {
          if (grid[i][j].length > 0)
            _scores[grid[i][j][0].color] += grid[i][j].length;
        }
      }
      if (
        _scores[0] + _scores[1] >= 2 &&
        (_scores[0] == 0 || _scores[1] == 0)
      ) {
        isGameOver = true;
      }
      scores = _scores;
      return _scores;
    };

    let getUnstableCells = () => {
      let criticals = [];
      let cell = null;
      for (var i = 0; i < HEIGHT; i++) {
        for (var j = 0; j < WIDTH; j++) {
          cell = { x: j, y: i };
          if (grid[i][j].length == criticalMass(cell)) {
            criticals.push(cell);
          }
        }
      }
      return criticals;
    };

    let isInside = cell => {
      return cell.x >= 0 && cell.x < WIDTH && (cell.y >= 0 && cell.y < HEIGHT);
    };

    let isLegalCell = cell => {
      if (!isInside(cell)) return false;
      else
        return (
          grid[cell.y][cell.x].length == 0 ||
          grid[cell.y][cell.x][0].color == turn
        );
    };

    let createRobot = (x, y, color) => {
      let self = {};
      self.inMovment = false;
      self.x = x;
      self.y = y;
      self.robotId = Math.random()
        .toString(36)
        .substring(7);
      self.destinationX = x;
      self.destinationY = y;
      self.color = color;
      self.show = () => {
        p.smooth();
        p.stroke(11,11,11);
        p.strokeWeight(2)
        p.fill(colors[self.color]);
        p.ellipse(self.x, self.y, robotRadius);
      };
      self.move = (x, y) => {
        if (!self.inMovment) {
          self.destinationX = x;
          self.destinationY = y;
        }
      };
      self.update = (x, y) => {
        self.x += (self.destinationX - self.x) * easing;
        self.y += (self.destinationY - self.y) * easing;
        self.inMovment = !(
          self.x - self.destinationX < 0.1 && self.y - self.destinationY < 0.1
        );
      };
      return self;
    };

    p.setup = function() {
      song = p.loadSound("./hit.mp3");
      font = p.loadFont("./pixel.ttf");
      p.createCanvas(width, height);
      initGrid();
    };

    let pushToAdjacent = (targetCell, explodedRobot) => {
      let targetStack = grid[targetCell.y][targetCell.x];
      for (let i = 0; i < targetStack.length; i++) {
        if (targetStack[i].robotId != explodedRobot.robotId) {
          targetStack[i].robotId = explodedRobot.robotId;
          targetStack[i].color = explodedRobot.color;
        }
      }
      targetStack.push(explodedRobot);
      while (criticalMass(targetCell) < targetStack.length) {
        targetStack.pop();
      }
    };

    let isExploding = () => {
      for (var i = 0; i < HEIGHT; i++) {
        for (var j = 0; j < WIDTH; j++) {
          for (var k = 0; k < grid[i][j].length; k++) {
            if (grid[i][j][k].inMovment) return true;
          }
        }
      }
      return false;
    };

    let explode = unstableCell => {
      let adjacents = [
        { x: unstableCell.x - 1, y: unstableCell.y },
        { x: unstableCell.x + 1, y: unstableCell.y },
        { x: unstableCell.x, y: unstableCell.y - 1 },
        { x: unstableCell.x, y: unstableCell.y + 1 }
      ];
      adjacents.forEach(adjacentCell => {
        if (
          isInside(adjacentCell) &&
          grid[unstableCell.y][unstableCell.x].length > 0
        ) {
          let explodedRobot = grid[unstableCell.y][unstableCell.x].pop();
          let targetCoordinates = gridToPixel(adjacentCell);
          explodedRobot.move(targetCoordinates.x, targetCoordinates.y);
          pushToAdjacent(adjacentCell, explodedRobot);
        }
      });
      if (!isGameOver) song.play();
    };

    let play = (cell, col) => {
      let pos = gridToPixel(cell);
      grid[cell.y][cell.x].push(createRobot(pos.x, pos.y, col));
      switchTurn();
      checkUnstablesAndExplode();
    };
    let checkUnstablesAndExplode = () => {
      getUnstableCells().forEach(unstableCell => {
        explode(unstableCell);
      });
    };

    p.mouseClicked = () => {
      let cell = pixelToGrid(p.mouseX, p.mouseY);
      
      if (isLegalCell(cell) && !isExploding() && networkTurn && getUnstableCells().length==0) {
        selfPlayed = true;
        play(cell, selfcolor);
        song.play();
        p.sendMove(cell);
        opx = -1;
        opy = -1;
      }
    };

    let drawProgress = () => {
      let progOffset = 12;
      p.fill(255);
      p.noStroke()
      p.rect(
        marginX,
        marginY + cellSpacing * HEIGHT + progOffset,
        cellSpacing * WIDTH,
        progressHeight - progOffset
      );
      if (scores[0] != 0 && scores[1] != 0) {
        p.fill(colors[0]);
        p.rect(
          marginX,
          marginY + cellSpacing * HEIGHT + progOffset,
          cellSpacing * WIDTH * (scores[0] / (scores[1] + scores[0])),
          progressHeight - progOffset
        );
        p.fill(colors[1]);
        p.rect(
          marginX + cellSpacing * WIDTH * (scores[0] / (scores[1] + scores[0])),
          marginY + cellSpacing * HEIGHT + progOffset,
          cellSpacing * WIDTH * (scores[1] / (scores[1] + scores[0])),
          progressHeight - progOffset
        );
      }
    };

    p.draw = function() {
      
      p.strokeWeight(1);
      //p.translate(-width / 2, -height / 2);

  
        p.background("#e6e6e6");
        p.textSize(32);
        p.stroke(128);
    
        drawLines();
        //drawDots();
        drawProgress();
        for (var i = 0; i < HEIGHT; i++) {
          for (var j = 0; j < WIDTH; j++) {
            if (grid[i][j])
              grid[i][j].forEach(element => {
                element.update();
                element.show();
              });
          }
        }
        if (!isExploding()) {
          checkUnstablesAndExplode();
        }
      
      calculateScore();
      if (isGameOver) {
        p.push()
        p.translate(width / 2, height / 2);
        p.textAlign(p.CENTER);
        p.background(255, 255, 255, 200);
        p.fill(255);
        p.textSize(32);
        p.text("Game Over", 0, 0);
        p.textSize(22);
        p.text(networkTurn == 0 ? "🥳🎉You won!👏🎆" : "😔 You lost 😢", 0, 30);
        p.pop()
      }
    };
    let selfcolor = 0;
    let opponentcolor = 1;
    p.myCustomRedrawAccordingToNewPropsHandler = props => {

      p.sendMove = props.sendMove;
      networkTurn = props.turn ? 1 : 0;
      selfcolor = props.host ? 1 : 0;
      opponentcolor = props.host ? 0 : 1;
      if (props.opx != opx || props.opy != opy) {
        opx = props.opx;
        opy = props.opy;
        if (isLegalCell({ x: opx, y: opy }) && !isExploding()) {
          opponentPlayed = true;
          play({ x: opx, y: opy }, opponentcolor);
          if (!isGameOver) song.play();
        }
      }
    };
  };
  render() {
    return (
      <div style={{ position:'fixed', height:'100%', background: "#e6e6e6" }}>
        <P5Wrapper
          settings={this.props.settings}
          host={this.props.host}
          sketch={this.sketch}
          turn={this.state.turn}
          sendMove={this.sendMove}
          opx={this.state.x}
          opy={this.state.y}
        />
        <div style={{ textAlign: "center", color: "#222" }}>
          {this.state.turn ? (
            <tt className="blink_me">
              Your turn
            </tt>
          ) : (
            <tt>Waiting for opponent to move</tt>
          )}
        </div>
      </div>
    );
  }
}

export default Robots;
