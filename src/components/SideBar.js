import React, { Component } from "react";
import { connect } from 'react-redux';
import { AppRegistry, Image, StatusBar } from "react-native";
import { NavigationActions } from 'react-navigation';
import { logout } from "../services/modules/auth";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
import logo from "../assets/CCLogo640x480.png"
import PropTypes from 'prop-types'

class SideBar extends Component {

    constructor(props){
        super(props)
        this.state = {
        }
    }
    render() {
        const { isLoggedIn, logout, user, navigation } = this.props
        console.log(`In SideBar isLoggedIn : ${ isLoggedIn }`);
        
        let routes = (isLoggedIn) ? ["Home", "Profile", "Logout"] : ["Home", "Login", "Register"]
        return (
            <Container>
                <Content>
                <Image
                    source={{
                    uri:
                        "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
                    }}
                    style={{
                    height: 120,
                    width: "100%",
                    alignSelf: "stretch",
                    position: "absolute"
                    }}
                />
                <Image
                    square
                    style={{
                    height: 80,
                    width: 100,
                    position: "absolute",
                    alignSelf: "center",
                    top: 20
                    }}
                    source={logo}
                />
                <List
                    dataArray={routes}
                    contentContainerStyle={{ marginTop: 120 }}
                    renderRow={data => {
                    return (
                        <ListItem
                        button
                        onPress={() => navigation.navigate(data)}
                        >
                        <Text>{data}</Text>
                        </ListItem>
                    );
                    }}
                >
                </List>
                </Content>
            </Container>
        );
    }
}

SideBar.propTypes = {
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    user : PropTypes.object,
    navigation : PropTypes.object
  };
  
  const mapStateToProps = state => ({
    user : state.auth.user
  });
  
  const mapDispatchToProps = dispatch => ({
    logout : (a, b) => dispatch(logout(a,b)),
    /* loginScreen: () =>
      dispatch(NavigationActions.navigate({ routeName: 'Login' })), */
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);