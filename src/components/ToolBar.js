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
import { Link } from 'react-router-dom'

export default class AuditToolBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({
    value
  });

  render() {
    return (
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild={ true }>
            <DropDownMenu
                          value={ this.state.value }
                          onChange={ this.handleChange }>
              <MenuItem
                        value={ 1 }
                        primaryText="All Broadcasts" />
              <MenuItem
                        containerElement={ <Link to="/runs" /> }
                        primaryText="Profile"
                        leftIcon={ <FontIcon className="material-icons">
                                     people
                                   </FontIcon> } />
              <MenuItem
                        value={ 2 }
                        primaryText="All Voice" />
              <MenuItem
                        value={ 3 }
                        primaryText="All Text" />
              <MenuItem
                        value={ 4 }
                        primaryText="Complete Voice" />
              <MenuItem
                        value={ 5 }
                        primaryText="Complete Text" />
              <MenuItem
                        value={ 6 }
                        primaryText="Active Voice" />
              <MenuItem
                        value={ 7 }
                        primaryText="Active Text" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Audit Data Extraction" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <RaisedButton
                          label="Create Extraction Run"
                          primary={ true } />
            <IconMenu iconButtonElement={ <IconButton touch={ true }>
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