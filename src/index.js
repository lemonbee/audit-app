import React from 'react';
import ReactDOM from 'react-dom';
import ExtractRuns from './components/ExtractRuns';
import History from './components/History';
import './index.css';
import DataPackages from './components/DataPackages';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers/packageReducers'
import 'bootstrap/dist/css/bootstrap.css';
import AuditToolBar from './components/AuditToolBar';
const store = createStore(reducers)

const PageRouter = () => (

  <Provider store={ store }>
    <Router>
      <div>
        <AuditToolBar/>
        <hr/>
        <Route
               exact
               path="/"
               component={ ExtractRuns } />
        <Route
               path="/create"
               component={ DataPackages } />
      </div>
    </Router>
  </Provider>
)

ReactDOM.render(
  React.createElement(PageRouter),
  document.getElementById('root')
);
