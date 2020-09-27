import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTHENTICATE_USER,
  LOG_OUT,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CLEAR_AUTH_STATE,
  EDIT_PASSWORD_SUCCESSFUL,
  EDIT_PASSWORD_FAILED,
  SHOW_LOGIN_SIGNUP,
  SHOW_RESET_PASSWORD,
  START_RESET_PASSWORD,
} from "../actions/actionTypes";

const initialState = {
  // {uid: "g@gmail.com", displayName: "g", photoURL: null, email: "g@gmail.com", phoneNumber: null} --> getting user from firebase authentication
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
  showLoginSignup: true,
  showResetPassword: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
    case START_RESET_PASSWORD:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case EDIT_PASSWORD_SUCCESSFUL:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: false,
      };
    case EDIT_PASSWORD_FAILED:
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };
    case SHOW_LOGIN_SIGNUP:
      return {
        ...state,
        showLoginSignup: !state.showLoginSignup,
      };
    case SHOW_RESET_PASSWORD:
      return {
        ...state,
        showResetPassword: !state.showResetPassword,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedin: false,
      };
    default:
      return state;
  }
}
