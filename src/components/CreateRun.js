import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import { fetchReports, createDataExtRun } from '../actions/createRunActions'
var dataProviders = require('../data/DataProviders.json');
/**
 * A contrived example using a transition between steps
 */
class CreateRun extends React.Component {
  state = {
    selectedProvider: "",
    dataProviders: [],
    selectedCoCd: 1,
    coCds: [],
    selectedLedger: 1,
    ledgers: [],
    loading: false,
    finished: false,
    stepIndex: 0,
    reports: [],
    selectedReport: ""

  };
  componentWillMount() {
    // fetch()
    this.state.dataProviders = dataProviders._embedded.dataProviderList;
  }
  componentDidMount() {
    // this._fetchReports();
  }
  ;

  dummyAsync = (cb) => {
    this.setState({
      loading: true
    }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };
  isProviderSelected(index) {
    if ("undefined" !== typeof (index) && index.length > 0) {
      this.setState({
        "selectedProvider": this.state.dataProviders[index].entitySetName
      })
      this.props.fetchReportList(this.state.dataProviders[index].id);
    }

  }
  isReportSelected(index) {
    if ("undefined" !== typeof (index) && index.length > 0) {
      this.setState({
        "selectedReport": this.props.reports[index].id
      })

    }

  }

  getStepContent(stepIndex) {
    var that = this;

    switch (stepIndex) {
      case 0:
        return (
          <Table
                 deselectOnClickaway={ false }
                 onRowSelection={ this.isProviderSelected.bind(this) }>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>
                  Service Name
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Entityset Name
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn>
                  Created At
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { this.state.dataProviders.map((row, index) => (
                  <TableRow
                            key={ index }
                            selected={ that.state.selectedProvider == row.entitySetName }>
                    <TableRowColumn>
                      { row.serviceName }
                    </TableRowColumn>
                    <TableRowColumn>
                      { row.entitySetName }
                    </TableRowColumn>
                    <TableRowColumn>
                      { row.name }
                    </TableRowColumn>
                    <TableRowColumn>
                      { row.createdAt }
                    </TableRowColumn>
                  </TableRow>
                
                )) }.bind(this)
            </TableBody>
          </Table>
        );
      case 1:
        // this._fetchReports(5);
        return (
          <div>
            <h4>Selected Data Provider: { this.state.selectedProvider }</h4>
            <Table
                   deselectOnClickaway={ false }
                   onRowSelection={ this.isReportSelected.bind(this) }>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn
                                     colSpan="5"
                                     tooltip="Reports to Select"
                                     style={ { textAlign: 'center' } }>
                    Reports to Select
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Query Conditions
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Selection Fields
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Ordering Fields
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                { this.props.reports.map((row, index) => (
                    <TableRow
                              key={ index }
                              selected={ that.state.selectedReport == row.id }>
                      <TableRowColumn>
                        { row.id }
                      </TableRowColumn>
                      <TableRowColumn>
                        { row.name }
                      </TableRowColumn>
                      <TableRowColumn>
                        None
                      </TableRowColumn>
                      <TableRowColumn>
                        ALL
                      </TableRowColumn>
                      <TableRowColumn>
                        None
                      </TableRowColumn>
                    </TableRow>
                  
                  )) }.bind(this)
              </TableBody>
            </Table>
          </div>
        );
      case 2:
        return (
          <div>
            <h4>Selected Data Provider: { this.state.selectedProvider }</h4>
            <h4>Selected Report: { this.state.selectedReport }</h4>
            <Divider/>
            <p>
              Do you want to create a data extract job?
            </p>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {
      margin: '0 16px',
      overflow: 'hidden'
    };

    if (finished) {
      this.props.createRun(this.state.selectedReport, 100);
      // this.props.toDetail(this.props.newRunId);

    }

    return (
      <div style={ contentStyle }>
        <div>
          { this.getStepContent(stepIndex) }
        </div>
        <div style={ { marginTop: 24, marginBottom: 12 } }>
          <FlatButton
                      label="Back"
                      disabled={ stepIndex === 0 }
                      onTouchTap={ this.handlePrev }
                      style={ { marginRight: 12 } } />
          <RaisedButton
                        label={ stepIndex === 2 ? 'Create Extraction Run' : 'Next' }
                        primary={ true }
                        onTouchTap={ this.handleNext } />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <MuiThemeProvider>
        <div style={ { width: '70%', margin: 'auto' } }>
          <Stepper activeStep={ stepIndex }>
            <Step>
              <StepLabel>
                Select Data Source
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                Select Reports(Query/Filters/Selections)
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                Create a data extraction run
              </StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition
                            loading={ loading }
                            open={ true }>
            { this.renderContent() }
          </ExpandTransition>
        </div>
      </MuiThemeProvider>
    );
  }
}

function selectReports(reports) {

  if ("undefined" == typeof (reports.reports)) {
    return []
  } else {
    return reports.reports

  }
}

const mapStateToProps = (state) => {
  return {
    statusFilter: state.statusFilter,
    reports: selectReports(state.reports),
    newRunId: state.reports.newRunId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchReportList: (sDataSource) => dispatch(fetchReports(sDataSource)),
    toDetail: (sId) => dispatch(push('/job/' + sId)),
    createRun: (sReport, iNum) => dispatch(createDataExtRun(sReport, iNum))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateRun);
