import React from "react";
import { connect } from "react-redux";

import {
  login,
  clearAuthState,
  showLoginSignup,
  showResetPassword,
} from "../actions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleShowSignup = (e) => {
    this.props.dispatch(showLoginSignup());
  };

  handleShowResetPassword = (e) => {
    this.props.dispatch(showResetPassword());
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const { error, inProgress } = this.props.initialState;

    return (
      <form className="login-form">
        <span className="login-signup-header">User Login</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
        <div className="field">
          {inProgress ? null : (
            <button
              onClick={this.handleShowResetPassword}
              disabled={inProgress}
            >
              Reset Password
            </button>
          )}
        </div>

        {inProgress ? null : (
          <span onClick={this.handleShowSignup} className="link">
            Signup ?
          </span>
        )}
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialState: state,
  };
}
export default connect(mapStateToProps)(Login);
