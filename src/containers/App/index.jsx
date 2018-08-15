import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.scss';

import Header from './components/Header';
import Footer from './components/Footer';
class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="container-fluid text-center">
        <Header />
        <HomePage />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth;
  return {
    isAuthenticated,
  }
}
export default connect(mapStateToProps)(App)
