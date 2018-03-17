import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';


const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const LoginStatusMessage = ({ isLoggedIn, navigateToProfile }) => {
  if (!isLoggedIn) {
    return <Text>Please log in</Text>;
  }
  return (
    <View>
      <Text style={styles.welcome}>
        {'You are "logged in" right now'}
      </Text>
      <Button
        onPress={ navigateToProfile }
        title="Profile"
      />
    </View>
  );
};

LoginStatusMessage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  navigateToProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  navigateToProfile : () => dispatch(NavigationActions.navigate({ routeName: 'Profile' })),
})

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginStatusMessage);
