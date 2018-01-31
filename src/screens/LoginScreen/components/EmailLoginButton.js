import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import email_btn from "../assets/EmailButton.png"
import genericAlert from '../../../util/genericAlert';
import { loginWithEmail } from '../../../services/modules/auth'

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

const EmailLoginButton = ({formData, loginWithEmail}) => {
    const handleSubmit = isFormDataValid(formData)? () => loginWithEmail(formData.email, formData.password) : () => {}
    return (
      <TouchableHighlight style={loginStyles.btnSocial}  onPress={handleSubmit}>
        <Image style={loginStyles.btnSocial} 
          resizeMode='contain' 
          source={email_btn}
        />
      </TouchableHighlight>
    )
}

EmailLoginButton.propTypes = {
  loginWithEmail : PropTypes.func.isRequired,
  formData : PropTypes.object.isRequired
}

const mapDispatchToProps = {
  loginWithEmail
}


const mapStateToProps = (state) => ({
})


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

export default connect(mapStateToProps, mapDispatchToProps)(EmailLoginButton);
