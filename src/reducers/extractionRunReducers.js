import { getCompletedRuns } from '../actions/extractRunActions'
import { combineReducers } from 'redux'

export function extractRunReducer(state = [], action) {
  switch (action.type) {
    case "GET_COMPLETED":
      return state
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

const runreducers = combineReducers({
  runs: extractRunReducer,
  packageSelected: packageSelectedReducer
})



export default runreducers;