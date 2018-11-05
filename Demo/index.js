/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import Home from './Home'
import {name as appName} from './app.json';
// import MonthList from './mMonth/MonthList'
// module.exports = MonthList

AppRegistry.registerComponent(appName, () => Home);
