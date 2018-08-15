import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{pathname: '/auth/login', state: {from: props.location}}} />)}
  />
);

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated,
  }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
