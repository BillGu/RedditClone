import React, { Component } from 'react';

import { Navbar, Nav, NavItem, Glyphicon, NavDropdown, MenuItem } from 'react-bootstrap';

class NavBar extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
	return <Navbar fluid collapseOnSelect>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="/">Reddit 2.0&nbsp;<Glyphicon glyph="education" /></a>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
			    	<Nav pullRight>
				        <NavItem>Help&nbsp;<Glyphicon glyph="info-sign" /></NavItem>
			        </Nav>
		    </Navbar.Collapse>
		  </Navbar>;	
  }
};


export default NavBar
