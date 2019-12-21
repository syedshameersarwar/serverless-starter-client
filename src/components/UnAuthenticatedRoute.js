import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnAuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  const redirect = queryString("redirect");

  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect
            to={redirect === "" || redirect === null ? "/" : redirect}
          />
        )
      }
    />
  );
};

export default UnAuthenticatedRoute;

const queryString = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) return null;

  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
