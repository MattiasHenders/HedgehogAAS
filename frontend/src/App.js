import React, { Component } from 'react';
import logo from './images/hedgehog.svg';
import './App.css';
import Hedgehog from './Hedgehog'
import HedgehogCodes from './HedgehogCodes'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Hedgehog As A Service</h1>
          </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/hedgehog"/>
                )}/>
                <Route exact path='/hedgehog' component={Hedgehog} />
          </Switch>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/codes"/>
                )}/>
                <Route exact path='/codes' component={HedgehogCodes} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
