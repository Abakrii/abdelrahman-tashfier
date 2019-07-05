import React from "react";
import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems,
  createStackNavigator
} from "react-navigation";

import {
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  I18nManager
} from "react-native";
import AuthScreen from "../AuthScreen/index";
import MapScreen from "../MapScreen";

const CustomDrawerContentComponent = props => (
  <ScrollView style={{ backgroundColor: "#e6e6e6" }}>
    <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
      <Button
        onPress={() => {
          props.navigation.navigate("Home");
        }}
        title="نسجيل خروج"
      />
    </SafeAreaView>
  </ScrollView>
);

const Drawer = createDrawerNavigator(
  { test: MapScreen },
  {
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: I18nManager.isRTL ? "right" : "left"
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: AuthScreen
    },
    Details: {
      screen: Drawer
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
