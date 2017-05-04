import React from 'react';
import ReactDOM from 'react-dom';

import AuditToolBar from './components/AuditToolBar';
import ExtractRuns from './components/ExtractRuns';
import DataPackages from './components/DataPackages';
import CreateRun from './components/CreateRun';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import { getAllRuns } from './actions/extractRunActions'
import reducers from './reducers/runreducers'

import { Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'

// const history = syncHistoryWithStore(createBrowserHistory(), store)
const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(reducers, applyMiddleware(middleware));

var data = require('./data/runs.json');


const PageRouter = React.createClass({
  getInitialState: function() {
    return {
      statusFilter: '',
      runs: {}
    }
  },

  handleFilterUpdate: function(filterValue) {
    this.setState({
      statusFilter: filterValue
    })
  },
  render: function() {
    store.dispatch(getAllRuns(data))
    // var displayItems = this.state.runItems.filter(function(item) {
    //   var match = item.status.toLowerCase().indexOf(this.state.statusFilter.toLowerCase());
    //   return (match !== -1);
    // // return item;
    // }.bind(this));
    return (<Provider store={ store }>
              <div>
                <AuditToolBar/>
                <Router history={ history }>
                  <div>
                    <Route
                           exact
                           path="/"
                           component={ ExtractRuns } />
                    <Route
                           path="/create"
                           component={ CreateRun } />
                    <Route
                           path="/test"
                           component={ DataPackages } />
                  </div>
                </Router>
              </div>
            </Provider>
    )
  }
});

ReactDOM.render(
  React.createElement(PageRouter),
  document.getElementById('root')
);
