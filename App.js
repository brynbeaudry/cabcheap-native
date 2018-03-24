import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './src/store/createStore'


import AppWithNavigationState from './src/navigators/AppNavigator';
import navReducer from './src/store/navReducer'
import { MapView } from 'expo';
export default class App extends React.Component {

  store = createStore(navReducer)

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
