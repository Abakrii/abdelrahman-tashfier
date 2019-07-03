/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
//import SplashScreen from './SplashScreen';
import SplashScreen from "../SplashScreen";
import AuthScreen from "../AuthScreen";

type Props = {};
 class Main extends Component<Props> {
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

export default Main;