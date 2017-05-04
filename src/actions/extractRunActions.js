export function getAllRuns(payload) {
  return {
    type: "GET_ALL",
    payload
  }
}
export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const VisibilityFilters = {
  SHOW_ALL: '',
  SHOW_COMPLETED: 'COMPLETED',
  SHOW_STARTED: 'STARTED'
};
