import React, {Component} from 'react'
import { StyleSheet, View, Image } from 'react-native'
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
import { NavigationActions } from 'react-navigation';



export default class RegisterScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            loading : this.props.fetching || false,
            password: "",
            confirmPassword: "",
            successFirstName: false, errorFirstName: false,
            successLastName: false, errorLastName: false,
            successEmail: false, errorEmail: false,
            successPassword: false, errorPassword: false,
            successConfirmPassword: false, errorConfirmPassword: false
        };
    }

    
    _handleSubmit = () => {

            if (!this.state.successFirstName ||
                !this.state.successLastName ||
                !this.state.successEmail ||
                !this.state.successPassword ||
                !this.state.successConfirmPassword) {
                genericAlert("Oops!", "Please check required fields.");
                return;
            }
            let user = {
                'firstName': this.state.firstName,
                'lastName': this.state.lastName,
                'email': this.state.email,
                'password': this.state.password,
            };

            console.log(`In handle submit User: ${JSON.stringify(user)}`)
            console.log(`In handle submit props: ${JSON.stringify(this.props)}`)

            this.props.register(user)

    };

    print(m){
        console.log(m)
    }

    _navigateToLogin = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    };

    _validateFirstName = (value) => {
        this.setState({firstName: value});
        if (value !== "") { this.setState({successFirstName: true}); }
        if (value === "") { this.setState({successFirstName: false, errorFirstName: false}); }
    };

    _validateLastName = (value) => {
        this.setState({lastName: value});
        if (value !== "") { this.setState({successLastName: true}); }
        if (value === "") { this.setState({successLastName: false, errorLastName: false}); }
    };

    _validateEmail= (value) => {
        this.setState({email: value});
        // let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // let emailTest = regex.test(value);
        if (value !== "") {
            this.setState({errorEmail: false, successEmail: true});
        } else {
            this.setState({successEmail: false, errorEmail: true});
        }
        if (value === "") { this.setState({successEmail: false, errorEmail: false}); }
    };

    _validatePassword = (value) => {
        this.setState({password: value});
        if (value !== "" && value.length >= 6 && (value === this.state.confirmPassword)) {
            this.setState({
                errorPassword: false,
                errorConfirmPassword: false,
                successPassword: true,
                successConfirmPassword: true
            });
        } else {
            this.setState({successPassword: false, errorPassword: true});
            if (this.state.confirmPassword !== "") {
                this.setState({successConfirmPassword: false, errorConfirmPassword: true});
            }
        }
        if (value === "") { this.setState({successPassword: false, errorPassword: false}); }
    };

    _validateConfirmPassword = (value) => {
        this.setState({confirmPassword: value});
        if (value !== "" && value.length >= 6 && (value === this.state.password)) {
            this.setState({
                errorConfirmPassword: false,
                errorPassword: false,
                successConfirmPassword: true,
                successPassword: true
            });
        } else {
            this.setState({successConfirmPassword: false, errorConfirmPassword: true});
            if (this.state.password !== "") {
                this.setState({successPassword: false, errorPassword: true});
            }
        }
        if (value === "") { this.setState({successConfirmPassword: false, errorConfirmPassword: false}); }
    }; 

    render() {
        return (
            <Container style={registerStyles.container}>
                {/* <H1 style={loginStyles.brand}>{Constants.APP_NAME}</H1> */}
                <Image style={{flex:.4, flexDirection: 'column', height: undefined, width: undefined}} resizeMode='contain' source={logo}/>
                <Spinner 
                    visible={this.state.loading} 
                    textContent={"Loading..."} 
                    textStyle={{color: '#FFF'}} />
                <Content>
                <Form>
                    <Item first error={this.state.errorFirstName}>
                        <Input name="registerFirstName"
                               placeholder="First Name"
                               placeholderTextColor='#bdc3c7'
                               selectionColor='#ffffff'
                               value={this.state.firstName}
                               onChangeText={(value) => this._validateFirstName(value)}
                               autoCapitalize="words"
                               style={registerStyles.fieldInput}
                        />
                        {this.state.successFirstName
                            ? <Icon name='checkmark-circle' style={{color:'white'}}/> : null}
                        {this.state.errorFirstName
                            ? <Icon name='close-circle'/> : null}
                    </Item>
                    <Item style={registerStyles.inputSpacing}
                          error={this.state.errorLastName}>
                        <Input name="registerLastName"
                               placeholder="Last Name"
                               placeholderTextColor='#bdc3c7'
                               selectionColor='#ffffff'
                               value={this.state.lastName}
                               onChangeText={(value) => this._validateLastName(value)}
                               autoCapitalize="words"
                               style={registerStyles.fieldInput}
                        />
                        {this.state.successLastName
                            ? <Icon name='checkmark-circle' style={{color:'white'}}/> : null}
                        {this.state.errorLastName
                            ? <Icon name='close-circle'/> : null}
                    </Item>
                    <Item style={registerStyles.inputSpacing}
                          error={this.state.errorEmail}>
                        <Input name="registerEmail"
                               placeholder="E-mail"
                               placeholderTextColor='#bdc3c7'
                               selectionColor='#ffffff'
                               value={this.state.email}
                               onChangeText={(value) => this._validateEmail(value)}
                               keyboardType="email-address"
                               autoCapitalize="none"
                               style={registerStyles.fieldInput}
                        />
                        {this.state.successEmail
                            ? <Icon name='checkmark-circle' style={{color:'white'}}/> : null}
                        {this.state.errorEmail
                            ? <Icon name='close-circle'/> : null}
                    </Item>
                    <Item style={registerStyles.inputSpacing}
                          error={this.state.errorPassword}>
                        <Input name="registerPassword"
                               placeholder="Password"
                               placeholderTextColor='#bdc3c7'
                               selectionColor='#ffffff'
                               value={this.state.password}
                               onChangeText={(value) => this._validatePassword(value)}
                               autoCapitalize="none"
                               secureTextEntry={true}
                               style={registerStyles.fieldInput}
                        />
                        {this.state.successPassword
                            ? <Icon name='checkmark-circle' style={{color:'white'}}/> : null}
                        {this.state.errorPassword
                            ? <Icon name='close-circle'/> : null}
                    </Item>
                    <Item style={registerStyles.inputSpacing}
                          error={this.state.errorConfirmPassword}>
                        <Input name="registerConfirmPassword"
                               placeholder="Confirm Password"
                               placeholderTextColor='#bdc3c7'
                               selectionColor='#ffffff'
                               value={this.state.confirmPassword}
                               onChangeText={(value) => this._validateConfirmPassword(value)}
                               autoCapitalize="none"
                               secureTextEntry={true}
                               style={registerStyles.fieldInput}
                        />
                        {this.state.successConfirmPassword
                            ? <Icon name='checkmark-circle' style={{color:'white'}}/> : null}
                        {this.state.errorConfirmPassword
                            ? <Icon name='close-circle'/> : null}
                    </Item>
                    <View style={registerStyles.createAccountSection}>
                        <Button block
                                onPress={this._handleSubmit}
                                style={{backgroundColor:'#88B652'}}>
                            <Text style={{color:'#EBEDD0',fontWeight:'bold'}}>Create Account</Text>
                        </Button>
                    </View>
                    <View style={registerStyles.alreadyRegisteredSection}>
                        <Text style={{color:'black'}}>───────  or  ───────</Text>
                        <Text style={{color:'black',paddingTop:20}}>Already Registered?</Text>
                        <Button block
                                onPress={() => safeExecute(this._navigateToLogin)}
                                style={{backgroundColor:'#EBEDD0',marginTop:15}}>
                            <Text style={{color:'#3F664E',fontWeight:'bold'}}>Go Back To Login</Text>
                        </Button>
                    </View>
                </Form>
            </Content>
            </Container>
        );
    }
}

RegisterScreen.propTypes = {
    register : PropTypes.func,
    error : PropTypes.object,
    fetching : PropTypes.bool,
    isLoggedIn : PropTypes.bool
}

const registerStyles = StyleSheet.create({
    createAccountSection: {
        paddingTop: 20
    },
    alreadyRegisteredSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25
    },
    inputSpacing: {
        paddingTop: 10
    },
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

RegisterScreen.navigationOptions = {
  title: 'Sign Up Today',
};