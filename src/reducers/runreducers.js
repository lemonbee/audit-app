import { getCompletedRuns, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/extractRunActions';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
const {SHOW_ALL} = VisibilityFilters


export function extractRunReducer(state = {}, action) {
  switch (action.type) {
    case "GET_ALL":

      return Object.assign({}, state, {
        "runs": action.payload._embedded.extractionJobList,
      })

    default:
      return state
  }

}
export function packagesReducer(state = [], action) {
  switch (action.type) {
    case "GET_PACKAGES":
      return state.concat(action.payload.packages)

    default:
      return state
  }

}

export function packageSelectedReducer(state = {}, action) {
  switch (action.type) {
    case "GET_PACKAGE_VIEWS":
      return {

      }
    case "SELECT_PACKAGE":
      return Object.assign({}, state, {
        "packageId": action.payload.packageId,
        "views": action.payload.views
      })

    default:
      return state
  }

}
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const reducers = combineReducers({
  packages: packagesReducer,
  runs: extractRunReducer,
  packageSelected: packageSelectedReducer,
  statusFilter: visibilityFilter,
  routing: routerReducer
})

export default reducers;