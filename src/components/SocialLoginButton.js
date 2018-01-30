import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'



const SocialLoginButton = ({loginFunction, isLoggedIn, image }) => (
  <TouchableHighlight style={loginStyles.btnSocial}  onPress={loginFunction}>
    <Image style={loginStyles.btnSocial} 
      resizeMode='contain' source={image}
    />
  </TouchableHighlight>
);

SocialLoginButton.propTypes = {
  loginFunction : PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: '' }),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Login' })),
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialLoginButton);
