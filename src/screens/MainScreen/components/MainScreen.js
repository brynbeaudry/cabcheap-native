import React from 'react';
import PropTypes from 'prop-types'
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';
import logo from "../../../assets/CCLogo640x480.png"
import Spinner from 'react-native-loading-spinner-overlay'
import { StyleSheet, View, Image } from 'react-native'
import { Container, H1, H2, Content, Form, Item, Input, Button, Text, Label, Icon, Thumbnail } from 'native-base';
import Header from "../../../components/Header";

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

const MainScreen = ({error, fetching = false, isLoggedIn = false}) => (
  <Container style={mainStyles.container}>
      <Content>
        <Spinner 
          visible={fetching} 
          textContent={"Loading..."} 
          textStyle={{color: '#FFF'}} />
        <Image style={{flex:.4, flexDirection: 'column', height: undefined, width: undefined}} resizeMode='contain' source={logo}/>
        <LoginStatusMessage isLoggedIn={isLoggedIn} />
        <AuthButton isLoggedIn={isLoggedIn}/>
      </Content>
  </Container>
);

MainScreen.navigationOptions = {
  //title: 'Home Screen', taking this out appears to take away the top header.
};

MainScreen.propTypes = {
  error : PropTypes.object,
  fetching : PropTypes.bool.isRequired,
  isLoggedIn : PropTypes.bool.isRequired
}

export default MainScreen;
