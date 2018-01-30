import React, {Component} from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import { Container, Header, H1, H2, Content, Form, Item, Input, Button, Text, Label, Icon, Thumbnail } from 'native-base';
import axios from 'axios';
import querystring from 'query-string';
import Constants from '../config/constants';
import genericAlert from '../util/genericAlert';
import safeExecute from '../util/safeExecute'
import Spinner from 'react-native-loading-spinner-overlay'
import { storeAccessToken, storeApplicationUserId, storeRefreshToken, storeCredentials } from "../config/PotAuth";
import logo from "../assets/CCLogo640x480.png"
import fb_btn from "../assets/FBbtn.png"
import google_btn from "../assets/GplusBtn.png"
import {Facebook} from 'expo';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            correctPassword: false,
            loading : false
        };
    }

    _navigateToRegister = () => {
        this.props.navigation.navigate('Register')
    }

    print(m){
      console.log(m)
    }

    async _loginWithFacebook() {
    const { type, token, expires = undefined } = await Facebook.logInWithReadPermissionsAsync('162508234396151', {
      permissions: ['public_profile', 'email'],
    });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        //here, you should actually just post to get a token back from the server using connect token with the asertion grant.
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`);
        for (let item of Object.entries(response)){
          console.log(`${JSON.stringify(item)}`)
        }
        Alert.alert(
          'Logged in!',
          `Hi ${(await response.json()).name}!`,
        );
      }
    }

    _login = async () => {
        try {
            this.setState({ loading : true })

            if (this.state.username === "" && this.state.password === "") {
                genericAlert("Required Field", "Please enter an email and a password.");
                return;
            } else if (this.state.email === "") {
                genericAlert("Required Field", "Please enter an email.");
                return;
            } else if (this.state.password === "") {
                genericAlert("Required Field", "Please enter a password.");
                return;
            }

            let body = querystring.stringify({
                response: 'code',
                grant_type: 'password',
                username: this.state.email,
                password: this.state.password   
            });

            let response = await axios({
                method: 'post',
                url: `${Config.url}connect/token`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: body
            });

            if (response.status === 200) { // OK success
                this.setState({ loading : false })
                await storeAccessToken(response.data.access_token);
                await storeApplicationUserId(response.data.id_token);
                await storeRefreshToken(response.data.refresh_token)
                await storeCredentials(this.state.email, this.state.password)
                this.props.navigation.navigate('Main');
            } else {
                genericAlert("Request Error", "An error occurred during login.");
            }
        } catch (error) {
            genericAlert("Oops!", error.response.data.error_description);
        } finally {
            this.setState({ loading : false })
        }
    };

    render() {
        return (
            <Container style={loginStyles.container}>
                {/* <H1 style={loginStyles.brand}>{Constants.APP_NAME}</H1> */}
                <Image style={{flex:.4, flexDirection: 'column', height: undefined, width: undefined}} resizeMode='contain' source={logo}/>
                <Spinner 
                    visible={this.state.loading} 
                    textContent={"Loading..."} 
                    textStyle={{color: '#FFF'}} />
                <Content>
                    <Form>
                        <Item first>
                            <Icon active name='person' style={{color:'#EBEDD0'}} />
                            <Input name="loginEmail"
                                   placeholder="Email"
                                   placeholderTextColor='#bdc3c7'
                                   selectionColor='#ffffff'
                                   value={this.state.username}
                                   onChangeText={(value) => this.setState({email: value})}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   style={loginStyles.fieldInput} />
                        </Item>
                        <Item style={loginStyles.inputSpacing}>
                            <Icon active name='lock' style={{color:'#EBEDD0'}} />
                            <Input name="loginPassword"
                                   placeholder="Password"
                                   placeholderTextColor="#bdc3c7"
                                   selectionColor='#ffffff'
                                   value={this.state.password}
                                   onChangeText={(value) => this.setState({password: value})}
                                   autoCapitalize="none"
                                   secureTextEntry={true}
                                   style={loginStyles.fieldInput} />
                        </Item>
                        <View style={loginStyles.loginSection}>  
                            <Button block
                                    onPress={() => safeExecute(this._login)}
                                    style={loginStyles.btnBtn}>
                                <Text style={{color:'#EBEDD0', fontWeight:'bold'}}>Login</Text>
                            </Button>
                            <TouchableHighlight style={loginStyles.btnSocial}  onPress={this._loginWithGoogle}>
                              <Image style={loginStyles.btnSocial} 
                                resizeMode='contain' source={google_btn}
                              />
                            </TouchableHighlight>
                            <TouchableHighlight style={loginStyles.btnSocial}  onPress={this._loginWithFacebook} >
                              <Image style={loginStyles.btnSocial} 
                                resizeMode='contain' source={fb_btn}
                              />
                            </TouchableHighlight>
                        </View>
                        
                        
                        
                        <View style={loginStyles.registerSection}>
                            <Text block style={{color:'black'}}>───────  or  ───────</Text>
                            <Text block style={{color:'black'}}>Don't have an Account?</Text>
                            <Button block primary
                                    onPress={() => safeExecute(this._navigateToRegister)}
                                    style={{backgroundColor:'#5bc0de',marginTop:15}}>
                                <Text style={{color:'white',fontWeight:'bold'}}>Sign Up</Text>
                            </Button>
                        </View>
                        {/* if we wanna add a 'forgot password' feature
                        <View style={loginStyles.forgotPasswordSection}>
                            <Text style={loginStyles.forgotPasswordButton}
                                  onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                                Forgot password?
                            </Text>
                        </View>
                        */}
                    </Form>
                </Content>
            </Container>
        );
    }

}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 5
    },
    brand: {
        fontFamily: 'Helvetica',
        color: '#EBEDD0',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 32
    },
    title: {
        fontFamily: 'Helvetica',
        color: '#88B652',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 25,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5
    },
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

LoginScreen.navigationOptions = {
  title: 'Log In',
};
