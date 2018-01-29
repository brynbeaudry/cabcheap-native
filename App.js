import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

export default class App extends React.Component {

  composeEnhancers = compose
  
  middleware = [
    thunk,
    promiseMiddleware(),
    logger,
  ]
  enhancers = []

  store = createStore(
    AppReducer, 
    this.composeEnhancers(
        applyMiddleware(...this.middleware),
        ...this.enhancers
    ),
  );

  /* Adding Fonts to work with Nativebase */
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}


/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
