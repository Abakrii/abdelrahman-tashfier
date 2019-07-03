import {View, Text , StyleSheet} from 'react-native';
import React from 'react';
import {viewStyles, textStyles} from "./styles.js"
class SplashScreen extends React.Component {
  render() {
 

    return (
      <View style={viewStyles}>
        <Text style={textStyles}>
          Splash Screen
        </Text>
      </View>
    );
  }
}

export default SplashScreen;