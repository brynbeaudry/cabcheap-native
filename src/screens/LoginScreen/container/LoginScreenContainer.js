import { connect } from 'react-redux'
import { loginWithEmail, loginWithFacebook, loginWithGoogle } from '../../../services/modules/auth'
import { NavigationActions } from 'react-navigation';

import LoginScreen from '../components/LoginScreen'

const mapDispatchToProps = dispatch => ({
    loginWithEmail, 
    loginWithFacebook, 
    loginWithGoogle, 
    loginToRegister : () => dispatch(NavigationActions.navigate({ routeName: 'Register' })),
})


const mapStateToProps = (state) => ({
    error : state.error,
    fetching : state.fetching,
    isLoggedIn : state.auth.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)