/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './src/screens/Login/LoginScreen';
import ControlPanelScreen from './src/screens/ControlPanel/ControlPanelScreen';
import DailyCareNotesScreen from './src/screens/DailyCareNotes/DailyCareNotesScreen';
import SignAndSendScreen from './src/screens/SignAndSend/SignAndSendScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const MainNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerStyle: { display: 'none' },
      headerLeft: null
    }
  },
  ControlPanel: {
    screen: ControlPanelScreen,
    navigationOptions: {
      headerStyle: { display: 'none' },
      headerLeft: null
    }
  },
  DailyCareNotes: {
    screen: DailyCareNotesScreen,
    navigationOptions: {
      headerStyle: { display: 'none' },
      headerLeft: null
    }
  },
  SignAndSend: {
    screen: SignAndSendScreen,
    navigationOptions: {
      headerStyle: { display: 'none' },
      headerLeft: null
    }
  }
}, { initialRouteName: "SignAndSend"});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return ( <AppContainer /> );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
