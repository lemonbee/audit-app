import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
var dataProviders = require('../data/DataProviders.json');
var compCodes = require('../data/compCodes.json')
var ledgers = require('../data/ledgers.json')
const styles = {
  customWidth: {
    width: '500px',
  },
};
const buttonStyle = {
  margin: '2% 0 0 40%'

};

class CreateRun extends React.Component {
  state = {
    selectedReport: 1,
    reports: [],
    selectedCoCd: 1,
    coCds: [],
    selectedLedger: 1,
    ledgers: []

  };
  handleReportChange = (event, index, value) => this.setState({
    selectedReport: value
  });
  handleCoCdChange = (event, index, value) => this.setState({
    selectedCoCd: value
  });
  handleLedgerChange = (event, index, value) => this.setState({
    selectedLedger: value
  });
  componentWillMount() {
    this.state.reports = dataProviders._embedded.dataProviderList;
    this.state.coCds = compCodes._embedded.compCodeList;
    this.state.ledgers = ledgers._embedded.ledgerList;
  }
  onStartClicked = () => {
    console.log("test")
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {
      margin: '0 16px'
    };

    return (
      <MuiThemeProvider>
        <div style={ { width: '80%', margin: 'auto' } }>
          <SelectField
                       floatingLabelText="Select Report"
                       value={ this.state.selectedReport }
                       onChange={ this.handleReportChange }
                       style={ { margin: '30' } }>
            { this.state.reports.map((row, index) => (            <MenuItem
                                                                            value={ row.entitySetName }
                                                                            primaryText={ row.name } />)) }
          </SelectField>
          <SelectField
                       floatingLabelText="Select Company Code"
                       value={ this.state.selectedCoCd }
                       onChange={ this.handleCoCdChange }
                       style={ { margin: '30' } }>
            { this.state.coCds.map((row, index) => (            <MenuItem
                                                                          value={ row.compCode }
                                                                          primaryText={ row.name } />)) }
          </SelectField>
          <SelectField
                       floatingLabelText="Select Ledger"
                       value={ this.state.selectedLedger }
                       onChange={ this.handleLedgerChange }
                       style={ { margin: '30' } }>
            { this.state.ledgers.map((row, index) => (            <MenuItem
                                                                            value={ row.ledger }
                                                                            primaryText={ row.name } />)) }
          </SelectField>
          <br/>
          <RaisedButton
                        label="Start"
                        onClick={ this.onStartClicked }
                        style={ buttonStyle } />
        </div>
      </MuiThemeProvider>
    );
  }


}
export default CreateRun;