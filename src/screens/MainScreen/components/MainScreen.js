import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types'
import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = ({error, fetching, isLoggedIn = false}) => (
  <View style={styles.container}>
    <LoginStatusMessage isLoggedIn={isLoggedIn} />
    <AuthButton isLoggedIn={isLoggedIn}/>
  </View>
);

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

MainScreen.propTypes = {
  error : PropTypes.object,
  fetching : PropTypes.bool.isRequired,
  isLoggedIn : PropTypes.bool.isRequired
}

export default MainScreen;
