import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import {
  MemoryOutlined,
  ShortTextOutlined,
  VideogameAssetOutlined,
  HdrWeakOutlined,
  BrushOutlined,
  ShowChartOutlined
} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { withRouter } from "react-router-dom";

function GameCard({ name, link, history, Icon, AI }) {
  return (
    <Paper style={{ opacity: 0.9, marginBottom: 21 }}>
      <div style={{ padding: "41px 38px" }}>
        <Grid container spacing={1}>
          <Grid item sm={4}>
            <Icon style={{ fontSize: "107px" }} />
          </Grid>
          <Grid item sm={8}>
            <h1>{name}</h1>
            <ButtonGroup size="small" aria-label="small outlined button group">
              {AI && (
                <Button>
                  <MemoryOutlined />
                  &nbsp;&nbsp;AI
                </Button>
              )}
              <Button
                onClick={() => {
                  history.push(link);
                }}
              >
                <VideogameAssetOutlined />
                &nbsp;&nbsp;1 v 1
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

export class Carousel extends Component {
  render() {
    return (
      <Container maxWidth={"sm"}>
        <h2>Welcome to The Link</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <GameCard
            name={"Robots"}
            link={"/robots"}
            AI
            history={this.props.history}
            Icon={HdrWeakOutlined}
          />
          <GameCard
            name={"Pong"}
            link={"/pong"}
            history={this.props.history}
            Icon={ShortTextOutlined}
          />
          <GameCard
            name={"Draw!"}
            link={"/draw"}
            history={this.props.history}
            Icon={BrushOutlined}
          />
           <GameCard
            name={"Latency Test"}
            link={"/latte"}
            history={this.props.history}
            Icon={ShowChartOutlined}
          />
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/pong"} className="nav-link">
                Pong
              </Link>
            </li>

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

export default withRouter(Carousel);
