import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import AppRoutes from "./router/AppRouter";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {AppRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
