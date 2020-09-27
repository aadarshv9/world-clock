import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as firebase from "firebase";
import "bootstrap/dist/css/bootstrap.css";
import "firebase/firestore";
import "./index.css";
import App from "./components/App";
import reducer from "./reducer";

// eslint-disable-next-line
const dotenv = require("dotenv").config();
let store = createStore(reducer, applyMiddleware(thunk));

// Your web app's Firebase configuration
var firebaseConfig = {
  // Use your firebase API key
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "world-clock-ac622.firebaseapp.com",
  databaseURL: "https://world-clock-ac622.firebaseio.com",
  projectId: "world-clock-ac622",
  storageBucket: "world-clock-ac622.appspot.com",
  // Use your messagingSender id
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // Use your firebase Id
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
