import React from 'react';
import ReactDOM from 'react-dom';

import AuditToolBar from './components/AuditToolBar';
import ExtractRuns from './components/ExtractRuns';
import DataPackages from './components/DataPackages';
import CreateRun from './components/CreateRun';
import JobDetail from './components/JobDetail';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

// import reducers from './reducers/runreducers'
import { getAllRuns, fetchPostsSuccess, fetchRunsTest } from './actions/extractRunActions'
import { Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers/runreducers'
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import thunk from 'redux-thunk';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore';
// const history = syncHistoryWithStore(createBrowserHistory(), store)
const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(reducers, applyMiddleware(middleware, thunk));
// const store = configureStore();
var data = require('./data/runs.json');
//   fetch("/Audit/api/v1.0/Jobs")
//     .then((response) => {
//       return response.json()
//     })
//     .then((json) => {
//       this.setState({
//         tableData: json._embedded.extractionJobList
//       });
//     });

// }
function fetchRuns() {
  const URL = "/Audit/api/v1.0/Jobs";
  return fetch(URL, {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .then((json) => {
      return store.dispatch(fetchPostsSuccess(json))
    // return json
    });
}

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
    // store.dispatch(getAllRuns(data)); fetchRunsTest(url)
    const url = "/Audit/api/v1.0/Jobs";
    store.dispatch(fetchRunsTest(url));
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
                           path="/job/:id"
                           component={ JobDetail } />
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
