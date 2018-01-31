import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import fb_btn from "../assets/FBbtn.png"
import google_btn from "../assets/GplusBtn.png"
import email_btn from "../assets/EmailButton.png"
import genericAlert from '../../../util/genericAlert';


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

function isFormDataValid(formData) {
  if (formData.email === "" && formData.password === "") {
      genericAlert("Required Fields", "Please enter an email and password.");
      return false;
  } else if (formData.email === "") {
      genericAlert("Required Field", "Please enter an email.");
      return false;
  } else if (formData.password === "") {
      genericAlert("Required Field", "Please enter a password.");
      return false;
  }
  return true
}

const LoginButton = ({ provider, login, formData = {} }) => {
  if(provider !== 'EMAIL'){
    return (
      <TouchableHighlight style={loginStyles.btnSocial}  onPress={login}>
        <Image style={loginStyles.btnSocial} 
          resizeMode='contain' 
          source={imageFromProvider(provider)}
        />
      </TouchableHighlight>
    )
  } else {
    return (
      <TouchableHighlight style={loginStyles.btnSocial}  onPress={() => (isFormDataValid(formData) && login) }>
        <Image style={loginStyles.btnSocial} 
          resizeMode='contain' 
          source={imageFromProvider(provider)}
        />
      </TouchableHighlight>
    )
  }
}

LoginButton.propTypes = {
  provider : PropTypes.string.isRequired,
  login : PropTypes.func.isRequired,
  formData : PropTypes.object
}

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

export default LoginButton;
