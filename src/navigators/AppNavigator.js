import React from 'react';
import {Root} from "native-base";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import MenuNavigator from "./MenuNavigator";

import LoginScreen from '../screens/LoginScreen/container/LoginScreenContainer';
import MainScreen from '../screens/MainScreen/container/MainScreenContainer';
import ProfileScreen from '../screens/ProfileScreen/components/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen/container/RegisterScreenContainer';


/* This is where the sacreens are specified */
export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Register : { screen: RegisterScreen},
  Main: { screen: MenuNavigator },
  },
  {
      //contentComponent : props => <SideBar {...props}/>,
      initialRouteName : 'Main',
      headerMode: 'screen',
  }
);

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  _actionEventSubscribers = new Set();

  _addListener = (eventName, handler) => {
    eventName === 'action' && this._actionEventSubscribers.add(handler);
    return {
      remove: () => {
        this._actionEventSubscribers.delete(handler);
      },
    };
  };

  componentDidUpdate(lastProps) {
    const lastState = lastProps.nav;
    this._actionEventSubscribers.forEach(subscriber => {
      subscriber({
        lastState: lastProps.nav,
        state: this.props.nav,
        action: this.props.lastAction,
      });
    });
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <Root>
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch,
            state: nav,
            addListener: this._addListener,
          })}
        />
      </Root>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  lastAction: state.lastAction,
});

export default connect(mapStateToProps)(AppWithNavigationState);
