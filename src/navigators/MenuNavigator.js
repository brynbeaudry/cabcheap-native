import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';
import {Root} from "native-base";

import LoginScreen from '../screens/LoginScreen/container/LoginScreenContainer';
import MainScreen from '../screens/MainScreen/container/MainScreenContainer';
import ProfileScreen from '../screens/ProfileScreen/components/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen/container/RegisterScreenContainer';
import { SideBar } from "../components/SideBar";

export const MenuNavigator = DrawerNavigator(
  {
      Main: { screen: MainScreen},
      Profile: { screen: ProfileScreen },
      // Default config for all screens
     //headerMode: 'none',
  },
  {
      //contentComponent : props => <SideBar {...props}/>,
      initialRouteName : 'Main',
      headerMode: 'screen',
      drawerPosition: 'right',
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
  }
);

export default MenuNavigator
