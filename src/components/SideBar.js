import React, { Component } from "react";
import { connect } from 'react-redux';
import { AppRegistry, Image, StatusBar } from "react-native";
import { NavigationActions } from 'react-navigation';
import { logout } from "../services/modules/auth";
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
import logo from "../assets/CCLogo640x480.png"
import PropTypes from 'prop-types'


const SideBar = (props) => {

        const styles = StyleSheet.create({
            authMessage: {
            fontSize: 20,
            color: "black",
            /* textAlign: 'center',
            margin: 10, */
            },
        });

        const { isLoggedIn, logout, user, navigation } = props
        console.log(`In SideBar isLoggedIn : ${ isLoggedIn }`);
        console.log(`In SideBar props : ${ JSON.stringify(props) }`);
        let firstName = user ? user.firstName : ''
        
        let routes = (isLoggedIn) ? ["Home", "Profile", "Logout"] : ["Home", "Login", "Register"]
        let authMessage = (isLoggedIn) ? `Welcome ${firstName}!` : "Please Login!"
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
                <Text 
                    style={{
                    marginTop : 140,
                    width: "80%",
                    //position: "absolute",
                    alignSelf: "center",
                    textAlign : "center"
                }}>
                    {authMessage}
                </Text>
                <List
                    dataArray={routes}
                    contentContainerStyle={{ marginTop: 20 }}
                    renderRow={data => {
                        let onPress = (data === 'Logout' ? () => this.props.logout(this.props.accessToken, this.props.user.id) : () => navigation.navigate(data) )
                    return (
                        <ListItem
                        button
                        onPress={onPress}
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

SideBar.propTypes = {
    isLoggedIn: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    accessToken : PropTypes.string,
    user : PropTypes.object,
    navigation : PropTypes.object
  };
  
  const mapStateToProps = state => ({
    accessToken : state.auth.access_token,
    user : state.auth.user,
    isLoggedIn : state.auth.isLoggedIn
  });
  
  const mapDispatchToProps = dispatch => ({
    logout : (a, b) => dispatch(logout(a,b)),
    /* loginScreen: () =>
      dispatch(NavigationActions.navigate({ routeName: 'Login' })), */
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);