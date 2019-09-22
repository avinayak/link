import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';


const outerTheme = createMuiTheme({
    shadows:["none"],
    palette: {
      primary: {
        main: '#000000',
      },
    },
  });

ReactDOM.render(
    <ThemeProvider theme={outerTheme}>
  <HashRouter>
    <App />
  </HashRouter></ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
