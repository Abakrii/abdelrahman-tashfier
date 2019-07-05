/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {I18nManager} from "react-native";
//I18nManager.allowRTL(false)
I18nManager.forceRTL(true)
AppRegistry.registerComponent(appName, () => App);
