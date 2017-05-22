import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
var dataProviders = require('../data/DataProviders.json');
/**
 * A contrived example using a transition between steps
 */
class CreateRun extends React.Component {
  state = {
    selectedProvider: 1,
    dataProviders: [],
    selectedCoCd: 1,
    coCds: [],
    selectedLedger: 1,
    ledgers: []

  };
  componentWillMount() {
    // fetch()
    this.state.dataProviders = dataProviders._embedded.dataProviderList;
  }
  ;

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
  };

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
    if ("undefined" == typeof (index)) {
      this.setState({
        "selectedProvider": this.state.dataProviders[index].entitySetName
      })
    }

  }

  getStepContent(stepIndex) {
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
                            selected={ this.state.selectedProvider == row.entitySetName }>
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
        return (
          <div>
            <TextField
                       style={ { marginTop: 0 } }
                       floatingLabelText="Ad group name" />
            <p>
              Ad group status is different than the statuses for campaigns, ads, and keywords, though the statuses can affect each other. Ad groups are contained within a campaign,
              and each campaign can have one or more ad groups. Within each ad group are ads, keywords, and bids.
            </p>
            <p>
              Something something whatever cool
            </p>
          </div>
        );
      case 2:
        return (
          <p>
            Try out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions. If you run into any problems
            with your ads, find out how to tell if they're running and how to resolve approval issues.
          </p>
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
      return (
        <div style={ contentStyle }>
          <p>
            <a
               href="#"
               onClick={ (event) => {
                           event.preventDefault();
                           this.setState({
                             stepIndex: 0,
                             finished: false
                           });
                         } }>Click here</a> to reset the example.
          </p>
        </div>
      );
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
                        label={ stepIndex === 2 ? 'Finish' : 'Next' }
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

export default CreateRun;