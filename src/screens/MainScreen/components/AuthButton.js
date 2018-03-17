import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { logout } from "../../../services/modules/auth";


const AuthButton = ({ logout, loginScreen, isLoggedIn, accessToken = '', user = {} }) => {
  console.log(`In auth button  authToken : ${accessToken} \n and User: ${JSON.stringify(user)}`)
  return (
    <Button
      title={isLoggedIn ? 'Log Out' : 'Open Login Screen'}
      onPress={isLoggedIn ? () => logout(accessToken, user.id) : loginScreen}
    />
  );
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired,
  accessToken : PropTypes.string,
  user : PropTypes.object
};

const mapStateToProps = state => ({
  accessToken : state.auth.access_token,
  user : state.auth.user
});

const mapDispatchToProps = dispatch => ({
  logout : (a, b) => dispatch(logout(a,b)),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
