import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Checkout from './components/Checkout';

export default class App extends React.Component {
  render() {
      return (
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/checkout" exact component={Checkout} />
              <Route component={NoMatch} />
            </Switch>
          </div>
      );
  }
};
