import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Signup from "./Signup";
import View from "./View";
import ResetPassword from "./ResetPassword";

class App extends React.Component {
  render() {
    const {
      isLoggedin,
      showLoginSignup,
      showResetPassword,
    } = this.props.intialState;
    return (
      <div>
        {isLoggedin ? (
          <View />
        ) : showLoginSignup ? (
          showResetPassword ? (
            <ResetPassword />
          ) : (
            <Login />
          )
        ) : (
          <Signup />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    intialState: state,
  };
}

export default connect(mapStateToProps)(App);
