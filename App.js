/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from "./src/screens/AuthScreen";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
  super(props);

  this.state = { isLoading: true }
}
performTimeConsumingTask = async() => {
  return new Promise((resolve) =>
    setTimeout(
      () => { resolve('result') },
      2000
    )
  );
}
async componentDidMount() {
  // Preload data from an external API
  // Preload data using AsyncStorage
  const data = await this.performTimeConsumingTask();

  if (data !== null) {
    this.setState({ isLoading: false });
  }
}
  render() {
  if (this.state.isLoading) {
    return <SplashScreen />;
  }

  return  <AuthScreen/>;
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
