import React from "react";
import { connect } from "react-redux";
import {
  startSingup,
  signup,
  clearAuthState,
  showLoginSignup,
  signupFailed,
} from "../actions/";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    this.props.dispatch(showLoginSignup());
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (email && password && confirmPassword && name) {
      if (password !== confirmPassword) {
        this.props.dispatch(signupFailed("Password do not matched"));
        this.setState({
          password: "",
          confirmPassword: "",
        });
        return;
      }
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      this.props.dispatch(startSingup());
      this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    const { inProgress, error } = this.props.initialState;
    return (
      <form className="login-form">
        <span className="login-signup-header"> User Signup</span>
        {error && <div className="alert error-dailog">{error}</div>}
        {error === false && (
          <div className="alert success-dailog">
            Signed Up Succeesfuly, Login to continue!
          </div>
        )}
        <div className="field">
          <input
            placeholder="Name"
            type="text"
            value={name}
            required
            onChange={(e) => this.handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Email"
            value={email}
            type="email"
            required
            onChange={(e) => this.handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Password"
            value={password}
            type="password"
            required
            onChange={(e) => this.handleInputChange("password", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Confirm Password"
            value={confirmPassword}
            type="password"
            required
            onChange={(e) =>
              this.handleInputChange("confirmPassword", e.target.value)
            }
          />
        </div>
        <div className="field">
          <button onClick={this.onFormSubmit} disabled={inProgress}>
            Signup
          </button>
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
export default connect(mapStateToProps)(Signup);
