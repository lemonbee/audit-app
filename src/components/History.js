import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Col } from 'react-bootstrap';

let data = [{
  package: 'Audit Journal',
  view: 'Journal Entries',
  time: '2017/03/01',
  number: 5000,
  by: 'Alice'
},
  {
    package: 'Audit Journal',
    view: 'Journal Changes',
    time: '2017/03/09',
    number: 19900,
    by: 'Alice'
  },
  {
    package: 'Audit Journal',
    view: 'Multi-referenced Invoices',
    time: '2017/03/11',
    number: 55500,
    by: 'Alice'
  },
  {
    package: 'Audit Journal',
    view: 'Gaps in Journal Entries Numbering',
    time: '2017/03/21',
    number: 2400,
    by: 'Alice'
  }
]

class Home extends Component {


  render() {
    return (
      <Col
           sm={ 10 }
           xsOffset={ 1 }>
      <BootstrapTable
                      data={ data }
                      exportCSV>
        <TableHeaderColumn
                           dataField='package'
                           isKey>
          Data Package
        </TableHeaderColumn>
        <TableHeaderColumn dataField='view'>
          View
        </TableHeaderColumn>
        <TableHeaderColumn dataField='time'>
          Time
        </TableHeaderColumn>
        <TableHeaderColumn dataField='number'>
          Number of Records
        </TableHeaderColumn>
        <TableHeaderColumn dataField='by'>
          Processor
        </TableHeaderColumn>
      </BootstrapTable>
      </Col>
    );
  }
}
export default Home;