export function getAllRuns(payload) {
  return {
    type: "GET_ALL",
    payload
  }
}
export function fetchRunsTest(url) {
  return (dispatch) => {

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => response.json())
      .then((runs) => dispatch(getAllRuns(runs)))

  }
}

export function fetchPostsSuccess(payload) {
  return {
    type: "FETCH_ALL_SUCCESS",
    payload
  }
}
export function fetchPostsError() {
  return {
    type: "FETCH_ERROR"
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
  SHOW_ALL: 'ALL',
  SHOW_COMPLETED: 'COMPLETED',
  SHOW_STARTED: 'STARTED',
  SHOW_ERROR: 'COMPLETEDWITHERROR'
};
