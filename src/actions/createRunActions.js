import { push } from 'react-router-redux'
export function getAllReports(payload) {
  return {
    type: 'GET_ALL_REPORTS',
    payload
  }
}

export function fetchReports(sDataSource) {
  return (dispatch) => {

    fetch('/Audit/api/v1.0/DataProviders/' + sDataSource + '/Reports')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((reports) => dispatch(getAllReports(reports)))

  }
}
export function setNewDataRunId(sId) {
  return {
    type: 'SET_NEW_RUN_ID',
    sId
  }
}

export function createDataExtRun(sReportId, iNumPerThread) {
  return (dispatch) => {
    fetch('/Audit/api/v1.0/Reports/' + sReportId + '/Jobs/AuditJournal/' + iNumPerThread, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((json) => dispatch(push('/job/' + json.id)))
    ;
  }

}


