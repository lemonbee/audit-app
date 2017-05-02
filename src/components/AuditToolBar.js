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

export default class AuditToolBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange(event, index, value) {
    this.setState({
      value
    })
  }
  ;

  render() {
    injectTapEventPlugin();
    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild={ true }>
            <IconMenu
                      value={ this.state.value }
                      onChange={ this.handleChange }
                      iconButtonElement={ <IconButton>
                                            <MoreVertIcon />
                                          </IconButton> }
                      anchorOrigin={ { horizontal: 'left', vertical: 'top' } }
                      targetOrigin={ { horizontal: 'left', vertical: 'top' } }>
              <MenuItem
                        value={ 1 }
                        primaryText="Completed Runs" />
              <MenuItem
                        value={ 2 }
                        primaryText="Downloaded Runs" />
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
                          primary={ true } />
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