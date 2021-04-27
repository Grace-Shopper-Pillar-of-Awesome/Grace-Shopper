import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div id="outer-signin">
      <div className="sign-in">
      <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
            <p className = "field-text">Username:</p>
          </label>
          <input name="username" type="text" />
        </div>
        {props.name === 'signup' ? (
            <div>
            <label htmlFor="email">
              <p className = "field-text">Email:</p>
            </label>
            <input name="email" type="text" />
          </div>
        ) : (
          ''
        )}
        <div>
            <label htmlFor="password">
            <p className = "field-text">Password:</p>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      </div>
      </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      if (evt.target.email) {
        const email = evt.target.email.value;
        dispatch(authenticate(username, password, formName, email));
      } else {
        dispatch(authenticate(username, password, formName));
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
