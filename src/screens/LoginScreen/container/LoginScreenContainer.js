import { connect } from 'react-redux'
import { loginWithEmail, loginWithFacebook, loginWithGoogle } from '../../../services/modules/auth'
import { NavigationActions } from 'react-navigation';

import LoginScreen from '../components/LoginScreen'

const mapDispatchToProps = {
    loginWithFacebook : loginWithFacebook, 
    loginWithGoogle: loginWithGoogle, 
    loginToRegister : () => NavigationActions.navigate({ routeName: 'Register' }),
}


const mapStateToProps = (state) => ({
    error : state.auth.error,
    fetching : state.auth.fetching,
    isLoggedIn : state.auth.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)