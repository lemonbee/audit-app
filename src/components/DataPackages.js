import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Col, Button } from 'react-bootstrap';
import { connect } from "react-redux"
import { getPackagesList, getViewsList, selectPackage } from '../actions/packageActions'

'use strict'

var data_packages = [{
  package: 'Audit Journal',
  view: 'Views'
}];
const cellEditProp = {
  mode: 'dbclick',
  blurToSave: true
};
const colorTypes = [
  'red',
  'blue',
  'yellow'
];

const viewsSelectable = [
  'Journals',
  'Gaps'

];
function handleClick() {
  fetch('/Audit/api/v1.0/job/AuditJournal/CostCenterVHSet/5', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      viewName: 'yourValue',
      reportName: 'yourOtherValue',
    })
  })
}


class DataPackages extends Component {
  constructor(props) {
    super(props);
  // this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount() {
    this.props.dispatch(getPackagesList())
  }
  componentDidMount() {
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
        });
      }

    );
  }

  render() {
    var that = this;
    const onRowSelect = function(row, isSelected, e) {
      that.props.dispatch(selectPackage(row.packageId))
    }
    const selectRow = {
      mode: 'radio',
      bgColor: 'rgb(204, 229, 255)',
      onSelect: onRowSelect
    };

    return (

      <Col
           sm={ 10 }
           xsOffset={ 1 }>
      <BootstrapTable
                      data={ this.props.packages }
                      selectRow={ selectRow }
                      cellEdit={ cellEditProp }>
        <TableHeaderColumn
                           dataField='packageId'
                           isKey>
          Data Package ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField='packageName'>
          Data Package Name
        </TableHeaderColumn>
      </BootstrapTable>
      <BootstrapTable
                      data={ this.props.packageSelected.views }
                      selectRow={ selectRow }
                      cellEdit={ cellEditProp }
                      insertRow
                      deleteRow
                      exportCSV>
        <TableHeaderColumn
                           dataField='viewId'
                           isKey>
          View ID
        </TableHeaderColumn>
        <TableHeaderColumn dataField='viewName'>
          View Name
        </TableHeaderColumn>
      </BootstrapTable>
      <Button
              bsStyle="primary"
              onClick={ handleClick }>
        Create Job
      </Button>
      </Col>
    );
  }
}
function select(state) {
  return {
    packages: state.packages,
    packageSelected: state.packageSelected,
  }
}

export default connect(select)(DataPackages)

