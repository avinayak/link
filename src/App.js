import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Room from "./Room";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import '../node_modules/react-vis/dist/style.css';

import Carousel from "./Carousel";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar elevation={0.9} border={1} position="static">
        <Toolbar >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <a href={window.location.href.split("#")[0]} className="nav-link nonlink pixel">
              Link
            </a>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      
        <Router>
          <div>
            <Switch>
              <Route path="//" component={Carousel} />
              <Route path="/pong/:roomid" component={Room} />
              <Route path="/pong" component={Room} />
              <Route path="/robots/:roomid" component={Room} />
              <Route path="/robots" component={Room} />
              <Route path="/draw/:roomid" component={Room} />
              <Route path="/draw" component={Room} />
              <Route path="/latte/:roomid" component={Room} />
              <Route path="/latte" component={Room} />
            </Switch>
          </div>
        </Router>
  
    </React.Fragment>
  );
}

export default App;
