import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { getCompletedRuns } from '../actions/extractRunActions';
import { VisibilityFilters } from '../actions/extractRunActions';
import { push } from 'react-router-redux'
import { getAllRuns, fetchPostsSuccess, fetchRunsTest } from '../actions/extractRunActions'
import { connect } from "react-redux"
// var dataProviders = require('../data/DataProviders.json');
var data = require('../data/runs.json');
const style = {
  // height: "300",
  width: "80%",
  margin: "auto",
  "margin-top": 10,
  // textAlign: 'center',

// display: 'inline-block',
};
class ExtractRuns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '60%',
      tableData: []
    };

  }

  componentDidMount() {
    // var data = require('json!../data/runs.json');
    // this.setState({
    //   tableData: data._embedded.extractionJobList
    // });
    // console.log("test");
    // fetch("/Audit/api/v1.0/Jobs")
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .then((json) => {
    //     this.setState({
    //       tableData: json._embedded.extractionJobList
    //     });
    //   });
    // this.dispatch(getAllRuns(data))

    // this.fetchRuns()
    this.props.fetchData('/Audit/api/v1.0/Jobs');

  }
  onRowSelected(index) {
    console.log("test")
    var sId = this.props.visibleRuns[index].id;
    this.props.toDetail(sId);
  // this.props.dispatch(push('/job/' + sId))
  }

  render() {
    return (
      <MuiThemeProvider>
        <Table
               style={ style }
               height={ this.state.height }
               fixedHeader={ this.state.fixedHeader }
               fixedFooter={ this.state.fixedFooter }
               selectable={ this.state.selectable }
               onRowSelection={ this.onRowSelected.bind(this) }
               multiSelectable={ this.state.multiSelectable }>
          <TableHeader
                       displaySelectAll={ this.state.showCheckboxes }
                       adjustForCheckbox={ this.state.showCheckboxes }
                       enableSelectAll={ this.state.enableSelectAll }>
            <TableRow>
              <TableHeaderColumn
                                 colSpan="6"
                                 tooltip="Extraction Runs"
                                 style={ { textAlign: 'center' } }>
                Extraction Runs
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The Index">
                ID
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Run ID">
                Run ID
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Report Name">
                Report Name
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Run Status">
                Run Status
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Run Percentage">
                Run Percentage
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Created At">
                Created At
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="File Link">
                File Link
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
                     displayRowCheckbox={ this.state.showCheckboxes }
                     deselectOnClickaway={ this.state.deselectOnClickaway }
                     showRowHover={ this.state.showRowHover }
                     stripedRows={ this.state.stripedRows }>
            { this.props.visibleRuns.map((row, index) => (
                <TableRow
                          key={ index }
                          selected={ row.selected }>
                  <TableRowColumn>
                    { index }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.id }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.report.dataProvider.name }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.status }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.percentage }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.createdAt }
                  </TableRowColumn>
                  <TableRowColumn>
                    <a href={ 'http://localhost:8099/Audit/' + row.downloadLink }>
                      { row.downloadLink }
                    </a>
                  </TableRowColumn>
                </TableRow>
              )) }
          </TableBody>
        </Table>
      </MuiThemeProvider>

    )
  }
}
function selectVisibleRuns(runs, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL: {
      if ("undefined" == typeof (runs.runs)) {
        return []
      } else {
        return runs.runs
      }
    }
    case VisibilityFilters.SHOW_COMPLETED:
      return runs.runs.filter(runs => runs.status == filter)
    case VisibilityFilters.SHOW_STARTED:
      return runs.runs.filter(runs => runs.status == filter)
  }
}
ExtractRuns.propTypes = {
  fetchData: PropTypes.func.isRequired,
  visibleRuns: PropTypes.array.isRequired

};
const mapStateToProps = (state) => {
  return {
    visibleRuns: selectVisibleRuns(state.runs, state.statusFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(fetchRunsTest(url)),
    toDetail: (sId) => dispatch(push('/job/' + sId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtractRuns);