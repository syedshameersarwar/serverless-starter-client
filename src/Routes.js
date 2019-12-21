import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnAuthenticatedRoute from "./components/UnAuthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";

const Routes = ({ appProps }) => (
  <Switch>
    <AppliedRoute path='/' exact component={Home} appProps={appProps} />
    <UnAuthenticatedRoute
      path='/login'
      exact
      component={Login}
      appProps={appProps}
    />
    <UnAuthenticatedRoute
      path='/signup'
      exact
      component={Signup}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path='/notes/new'
      exact
      component={NewNote}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path='/notes/:id'
      exact
      component={Notes}
      appProps={appProps}
    />
    <AuthenticatedRoute
      path='/settings'
      exact
      component={Settings}
      appProps={appProps}
    />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
