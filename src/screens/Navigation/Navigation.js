import React from "react";
import { createNavigationAwareScrollable,NavigationActions,DrawerActions,createDrawerNavigator,createStackNavigator , createAppContainer , createMaterialTopTabNavigator , createSwitchNavigator } from 'react-navigation';

import AuthScreen from "../AuthScreen/index";
import MapScreen from "../MapScreen";


const AppNavigator = createStackNavigator({
    Home: {
      screen: AuthScreen,
    },
    Details: {
      screen: MapScreen,
    },
  }, {
      initialRouteName: 'Home',
  });
  const AppContainer = createAppContainer(AppNavigator);
  export default AppContainer;