import React from "react";
import { Route } from "react-router-dom";
import propTypes from "prop-types";
import AuthContext from "../AuthContext";

function PrivateRoute({ component: Component, scopes, ...rest }) {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Route
          {...rest}
          render={(props) => {
            //1. Redirect to login if not logged in.
            if (!auth.isAuthenticated()) return auth.login();

            //2. Display msg if user lacks scope(s)
            if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
              return (
                <h1>
                  {`Unauthorized you need the following scope(s) to view this page ${scopes.join(
                    ","
                  )}`}
                </h1>
              );
            }

            //3. Render Component
            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}

PrivateRoute.propTypes = {
  component: propTypes.func.isRequired,
  scopes: propTypes.array,
};

PrivateRoute.defaultProps = {
  scopes: [],
};

export default PrivateRoute;
