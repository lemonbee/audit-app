import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

const style = {
  height: "300",
  width: "60%",
  margin: "auto",
  "margin-top": 10,
  // textAlign: 'center',

// display: 'inline-block',
};

class JobDetial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      percentage: 0.1,
      status: "",
      reportId: "",
      createdAt: "",
      name: "",
      "serviceName": ""

    }
  }

  componentWillMount() {
    fetch('/Audit/api/v1.0/Jobs/' + this.props.match.params.id)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((job) => {
        this.setState({
          "status": job.status,
          "percentage": job.percentage,
          reportId: job.report.dataProvider.id,
          createdAt: job.report.dataProvider.createdAt,
          name: job.report.dataProvider.name,
          "serviceName": job.report.dataProvider.serviceName

        })
      })

  }
  render() {
    return (
      <MuiThemeProvider>
        <div style={ style }>
          <h2>Header Information</h2>
          <Divider/>
          <br/>
          <TextField
                     value={ this.props.match.params.id }
                     floatingLabelText="ID" />
          <TextField
                     value={ this.state.name }
                     floatingLabelText="Source Dataset Name" />
          <TextField
                     value={ this.state.serviceName }
                     floatingLabelText="Service Name" />
          <br/>
          <TextField
                     value={ this.state.createdAt }
                     floatingLabelText="Created At" />
          <TextField
                     value={ this.state.status }
                     floatingLabelText="Status" />
          <TextField
                     value={ this.state.percentage }
                     floatingLabelText="Percentage" />
          <br/>
          <TextField
                     value={ this.state.reportId }
                     floatingLabelText="Report" />
          <br/>
          <br/>
          <h2>Query Info</h2>
          <Divider/>
          <TextField
                     value={ this.state.serviceName }
                     floatingLabelText="Service Name" />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default JobDetial