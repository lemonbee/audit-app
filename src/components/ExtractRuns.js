import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    selected: true,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

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
      height: '300px',
      tableData: []
    };
  }
  loadData() {
    fetch(`/Audit/api/v1.0/job`)
      .then(function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response  
        response.json().then(function(data) {
          console.log(data);
          this.setState({
            tableData: data._embedded.extractionJobList
          });
        // this.state.tableData = data._embedded.extractionJobList;
        }.bind(this));
      }
    );
  }
  componentWillMount() {
    console.log("test");
    fetch("/Audit/api/v1.0/job")
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({
          tableData: json._embedded.extractionJobList
        });
      });
  // this.loadData();
  }

  render() {
    return (
      <MuiThemeProvider>
        <Table
               height={ this.state.height }
               fixedHeader={ this.state.fixedHeader }
               fixedFooter={ this.state.fixedFooter }
               selectable={ this.state.selectable }
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
              <TableHeaderColumn tooltip="View Name">
                View Name
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Run Status">
                Run Status
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Run Percentage">
                Run Percentage
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
            { this.state.tableData.map((row, index) => (
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
                    { row.viewName }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.status }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.percentage }
                  </TableRowColumn>
                  <TableRowColumn>
                    { row.downloadLink }
                  </TableRowColumn>
                </TableRow>
              )) }
          </TableBody>
        </Table>
      </MuiThemeProvider>

    )
  }
}
export default ExtractRuns;