import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import fb_btn from "../assets/FBbtn.png"
import google_btn from "../assets/GplusBtn.png"
import email_btn from "../assets/EmailButton.png"
import { LOGIN_USER_EMAIL, LOGIN_USER_FACEBOOK, LOGIN_USER_GOOGLE } from '../../../services/modules/auth'


function imageFromProvider(provider){
  switch (provider) {
    case 'FACEBOOK':
      return fb_btn
    case 'GOOGLE':
      return google_btn
    case 'EMAIL':
      return email_btn
    default :
      return email_btn
  }
}



function actionTypeFromProvider(provider){
  switch (provider) {
    case 'FACEBOOK':
      return LOGIN_USER_FACEBOOK
    case 'GOOGLE':
      return LOGIN_USER_GOOGLE
    case 'EMAIL':
      return LOGIN_USER_EMAIL
    default :
      return LOGIN_USER_EMAIL
  }
}



const LoginButton = ({ provider, login }) => (
  <TouchableHighlight style={loginStyles.btnSocial}  onPress={login}>
    <Image style={loginStyles.btnSocial} 
      resizeMode='contain' 
      source={imageFromProvider(provider)}
    />
  </TouchableHighlight>
);

LoginButton.propTypes = {
  provider : Proptypes.string.isRequired,
  login : Proptypes.func.isRequired,
  //strangley, the image sends in a number.
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: actionTypeFromProvider(this.props.provider) }),
});

const loginStyles = StyleSheet.create({

  loginSection: {
    flex: .5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom : 1

  },
  registerSection: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: 30
  },
  btnSocial: {
    marginTop : 0,
    paddingTop : 0,
    width : '100%',
  },
  btnBtn: {
    width: '100%',
    height : '33%',
    backgroundColor:'#88B652',
    marginBottom: 7
  },
  btnSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordSection: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20
  },
  forgotPasswordButton: {
      color: 'blue',
  },
  inputSpacing: {
      paddingTop: 10
  },
  fieldInput: {
      color: 'black'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
