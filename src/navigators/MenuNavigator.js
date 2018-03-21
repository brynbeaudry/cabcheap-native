import React from 'react';

import { DrawerNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen/container/LoginScreenContainer';
import MainScreen from '../screens/MainScreen/container/MainScreenContainer';
import ProfileScreen from '../screens/ProfileScreen/components/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen/container/RegisterScreenContainer';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import SideBar from "../components/SideBar";

const MenuNavigator = DrawerNavigator(
  {
      Home: { screen: MainScreen },
      Profile: { screen: ProfileScreen },
      // Default config for all screens
      //headerMode: 'none',
  },
  {
      contentComponent : (props) => <SideBar {...props}/>,
      initialRouteName : 'Home',
      navigationOptions : ({navigation}) => ({
        headerMode: 'screen',
      headerLeft : <Button
        transparent
        onPress={() => navigation.navigate("DrawerOpen")}>
        <Icon name="menu" />
      </Button>,
      }),
      drawerPosition: 'left',
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
  }
);

export default MenuNavigator
