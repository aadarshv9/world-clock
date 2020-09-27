import React from "react";
import { connect } from "react-redux";
import * as firebase from "firebase";
import {
  clearAuthState,
  editPasswordSuccessful,
  editPasswordFailed,
  startResetPassword,
  showResetPassword,
} from "../actions/";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      oldPassword: "",
      newPassword: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  handleShowLogin = (e) => {
    this.props.dispatch(showResetPassword());
  };

  onFormSubmit = async (e) => {
    e.preventDefault();
    this.props.dispatch(startResetPassword());
    const { email, oldPassword, newPassword } = this.state;
    const promise = firebase
      .auth()
      .signInWithEmailAndPassword(email, oldPassword);

    promise.then(async () => {
      var user = await firebase.auth().currentUser;
      user
        .updatePassword(newPassword)
        .then(() => {
          // Update successful.
          this.setState({
            oldPassword: "",
            newPassword: "",
          });
          this.props.dispatch(editPasswordSuccessful());
          setTimeout(() => this.props.dispatch(clearAuthState()), 3000);
        })
        .catch((error) => {
          // An error happened.
          this.setState({
            oldPassword: "",
            newPassword: "",
          });
          this.props.dispatch(editPasswordFailed(error.message));
        });
    });
    promise.catch((err) => {
      this.setState({
        oldPassword: "",
        newPassword: "",
      });
      this.props.dispatch(editPasswordFailed(err.message));
    });
  };

  render() {
    const { error, inProgress } = this.props.initialState;
    return (
      <form className="login-form">
        <span className="login-signup-header">Reset Password</span>
        {error && <div className="alert error-dailog">{error}</div>}
        {error === false && (
          <div className="alert success-dailog">
            Password reset successfully, Login to continue!
          </div>
        )}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => this.handleInputChange("email", e.target.value)}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Old Password"
            required
            onChange={(e) =>
              this.handleInputChange("oldPassword", e.target.value)
            }
            value={this.state.oldPassword}
          />
        </div>
        <div className="field">
          <input
            placeholder="New Password"
            value={this.state.newPassword}
            type="password"
            required
            onChange={(e) =>
              this.handleInputChange("newPassword", e.target.value)
            }
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.onFormSubmit} disabled={inProgress}>
              Resetting...
            </button>
          ) : (
            <button onClick={this.onFormSubmit} disabled={inProgress}>
              Reset
            </button>
          )}
        </div>
        {inProgress ? null : (
          <span onClick={this.handleShowLogin} className="link">
            Login ?
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

export default connect(mapStateToProps)(ResetPassword);
