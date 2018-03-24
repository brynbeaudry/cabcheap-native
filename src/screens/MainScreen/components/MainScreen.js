import React, {Component} from 'react';
import PropTypes from 'prop-types'
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import logo from "../../../assets/CCLogo640x480.png"
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, View, Image } from 'react-native'
import { Container, H1, H2, Content, Form, Item, Input, Button, Text, Label, Icon, Thumbnail } from 'native-base';
import Header from "../../../components/Header";
import CCMapView from "./CCMapView";

const mainStyles = StyleSheet.create({
  createAccountSection: {
      paddingTop: 20
  },
  alreadyRegisteredSection: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 25
  },
  inputSpacing: {
      paddingTop: 10
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      padding: 5
  },
  brand: {
      fontFamily: 'Helvetica',
      color: '#EBEDD0',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 32
  },
  title: {
      fontFamily: 'Helvetica',
      color: '#88B652',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 25,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5
  },
  inputSpacing: {
      paddingTop: 10
  },
});

// not logged in
const mainWelcome = (props) => (
  <Container style={mainStyles.container}>
        <Content>
          <Spinner 
            visible={props.fetching} 
            textContent={"Loading..."} 
            textStyle={{color: '#FFF'}} />
          <Image style={{flex:.4, flexDirection: 'column', height: undefined, width: undefined}} resizeMode='contain' source={logo}/>
          <LoginStatusMessage isLoggedIn={false} />
          <AuthButton isLoggedIn={false}/>
        </Content>
    </Container>
)

// Logged in : Show Map
const mapScreen = (props) => (
    <Container>
        <View style={{flex: 1}}>
            <CCMapView />
        </View>
        <Spinner 
        visible={props.fetching} 
        textContent={"Loading..."} 
        textStyle={{color: '#FFF'}} />
    </Container>
)

const MainScreen = (props) => {
    const {error, fetching = false, isLoggedIn = false} = props
    return (isLoggedIn) ? mapScreen(props) : mainWelcome(props)
} 


MainScreen.navigationOptions = {
  title: 'Home Screen'
};

MainScreen.propTypes = {
  error : PropTypes.object,
  fetching : PropTypes.bool.isRequired,
  isLoggedIn : PropTypes.bool.isRequired
}

export default MainScreen;
