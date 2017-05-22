import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/runreducers'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'
// const history = syncHistoryWithStore(createBrowserHistory(), store)
const history = createHistory()
const middleware = routerMiddleware(history)
export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(middleware, thunk)
  );
}
