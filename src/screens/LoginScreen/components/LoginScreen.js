import React, {Component} from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import { Container, Header, H1, H2, Content, Form, Item, Input, Button, Text, Label, Icon, Thumbnail } from 'native-base';
import axios from 'axios';
import PropTypes from 'prop-types'
import querystring from 'query-string';
import Constants from '../../../config/constants';
import genericAlert from '../../../util/genericAlert';
import safeExecute from '../../../util/safeExecute'
import Spinner from 'react-native-loading-spinner-overlay'
import { storeAccessToken, storeApplicationUserId, storeRefreshToken, storeCredentials } from "../../../config/PotAuth";
import logo from "../../../assets/CCLogo640x480.png"
import EmailLoginButton from './EmailLoginButton';
import SocialLoginButton from './SocialLoginButton';

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "f@f.f",
            password: "password",
            correctPassword: false,
        }

    }

    print(m){
      console.log(m)
    }

    render() {
        return (
            <Container style={loginStyles.container}>
                {/* <H1 style={loginStyles.brand}>{Constants.APP_NAME}</H1> */}
                <Image style={{flex:.4, flexDirection: 'column', height: undefined, width: undefined}} resizeMode='contain' source={logo}/>
                <Spinner 
                    visible={this.props.fetching} 
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
                                   value={this.state.email}
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
                            {/* Email Btn */}
                            <EmailLoginButton
                              formData={this.state}
                            />
                            {/* Google Btn */}                            
                            <SocialLoginButton
                              provider='GOOGLE'
                              login={this.props.loginWithGoogle}
                            />
                            {/* Facebook btn */}
                            <SocialLoginButton
                              provider='FACEBOOK'
                              login={this.props.loginWithFacebook}
                            />
                        </View>
                        <View style={loginStyles.registerSection}>
                            <Text block style={{color:'black'}}>───────  or  ───────</Text>
                            <Text block style={{color:'black'}}>Don't have an Account?</Text>
                            <Button block primary
                                    onPress={() => safeExecute(this.props.loginToRegister)}
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

LoginScreen.propTypes = {
    loginWithFacebook : PropTypes.func.isRequired,
    loginWithGoogle : PropTypes.func.isRequired,
    loginToRegister : PropTypes.func.isRequired,
    error : PropTypes.object,
    fetching : PropTypes.bool.isRequired,
    isLoggedIn : PropTypes.bool.isRequired
}
