import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import SingleGalaxy from './components/SingleGalaxy';
import AllGalaxies from './components/AllGalaxies';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route exact path="/galaxies" component={AllGalaxies} />
          <Route
            path="/cart"
            render={(props) => (
              <Cart
                {...props}
                id={this.props.id}
                isLoggedIn={this.props.isLoggedIn}
              />
            )}
          />
          <Route
            path="/checkout"
            render={(props) => (
              <Checkout
                {...props}
                id={this.props.id}
                isLoggedIn={this.props.isLoggedIn}
              />
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
        {/* {isLoggedIn ? (

          <Redirect to="/home" />
        </Switch>
        {/*isLoggedIn ? (

          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )} */}
        <Route path="/galaxies/:galaxyId" component={SingleGalaxy} />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
