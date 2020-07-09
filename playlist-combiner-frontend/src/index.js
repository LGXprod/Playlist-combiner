import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import LoginForm from "./components/login/LoginForm";
import Dashboard from "./components/dashboard/Dashboard";

ReactDOM.render(
  // using strict mode so I can more easily detect errors
  <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
