import React, { useState, Fragment, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

const App = props => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") alert(e);
    }

    setIsAuthenticating(false);
  };

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  };

  return (
    !isAuthenticating && (
      <div className='App container'>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <Fragment>
                  <LinkContainer to='/settings'>
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </Fragment>
              ) : (
                <Fragment>
                  <LinkContainer to='/signup'>
                    <NavItem>Signup</NavItem>
                  </LinkContainer>

                  <LinkContainer to='/login'>
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
      </div>
    )
  );
};

export default withRouter(App);
