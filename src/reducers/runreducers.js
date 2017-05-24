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
    case "FETCH_ALL_SUCCESS":
      return Object.assign({}, state, {
        "runs": action.payload._embedded.extractionJobList,
      })
    case "GET_ALL_RUNS":
      return Object.assign({}, state, {
        "runs": action.payload._embedded.extractionJobList,
      })

    default:
      return state
  }

}
export function reportsReducer(state = {}, action) {
  switch (action.type) {
    case 'GET_ALL_REPORTS':
      if ("undefined" !== typeof (action.payload._embedded)) {
        return Object.assign({}, state, {
          "reports": action.payload._embedded.reportList
        })
      }
      else return {};
    case 'SET_NEW_RUN_ID':
      return Object.assign({}, state, {
        "newRunId": action.sId
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
  routing: routerReducer,
  reports: reportsReducer
})

export default reducers;