import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from "react-redux"
import { setVisibilityFilter } from '../actions/extractRunActions'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

class AuditToolBar extends React.Component {

  constructor(props) {
    injectTapEventPlugin();
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange(event, index, value) {
    // this.props.updateFilter(index)
    this.props.dispatch(setVisibilityFilter(index))
  }
  ;

  render() {

    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild={ true }>
            <IconMenu
                      value={ this.state.value }
                      onChange={ this.handleChange.bind(this) }
                      iconButtonElement={ <IconButton>
                                            <MoreVertIcon />
                                          </IconButton> }
                      anchorOrigin={ { horizontal: 'left', vertical: 'top' } }
                      targetOrigin={ { horizontal: 'left', vertical: 'top' } }>
              <MenuItem
                        value={ "COMPLETED" }
                        primaryText="Completed Runs" />
              <MenuItem
                        value={ "STARTED" }
                        primaryText="Started Runs" />
              <MenuItem
                        value={ 3 }
                        primaryText="All Extraction Runs" />
              <MenuItem
                        value={ 4 }
                        primaryText="Error Runs" />
            </IconMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Audit Data Extraction Tool" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <RaisedButton
                          label="Create Extraction Run"
                          primary={ true }
                          onClick={ () => this.props.dispatch(push('/create')) } />
            <IconMenu iconButtonElement={ <IconButton>
                                            <NavigationExpandMoreIcon />
                                          </IconButton> }>
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    );
  }
}
function select(state) {
  return {
    statusFilter: state.statusFilter,
    browserHistory: state.routing
  }
}

export default connect(select)(AuditToolBar)