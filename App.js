

import React, { Component } from "react";

import Main from "./src/screens/Main/Main";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
type Props = {};
const store = configureStore();
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
