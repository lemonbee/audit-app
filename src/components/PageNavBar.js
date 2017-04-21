import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron, Button, Navbar, NavItem, MenuItem, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class PageNavBar extends Component {

  render() {
    return (
      <Navbar
              inverse
              collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Audit Data Extraction</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <Link
                    className="Nav__link"
                    to="/create_job"> Start Batch Download
              </Link>
            </NavItem>
            <NavItem>
              <Link
                    className="Nav__link"
                    to="/app"> Download History
              </Link>
              <Link
                    className="Nav__link"
                    to="/runs"> Extraction Runs
              </Link>
            </NavItem>
            <NavDropdown
                         eventKey={ 3 }
                         title="Dropdown"
                         id="basic-nav-dropdown">
              <MenuItem eventKey={ 3.1 }> Action
              </MenuItem>
              <MenuItem eventKey={ 3.2 }> Another action
              </MenuItem>
              <MenuItem eventKey={ 3.3 }> Something else here
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={ 3.3 }> Separated link
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem
                     eventKey={ 2 }
                     href="#">
              Your User
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

  }

}
export default PageNavBar;
