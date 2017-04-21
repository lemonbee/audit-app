import { getPackagesList, getViewsList, selectPackage } from '../actions/packageActions'
import { combineReducers } from 'redux'

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

const reducers = combineReducers({
  packages: packagesReducer,
  packageSelected: packageSelectedReducer
})

export default reducers;