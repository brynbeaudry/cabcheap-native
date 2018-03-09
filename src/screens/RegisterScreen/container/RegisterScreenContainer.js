import { connect } from 'react-redux'
import { register } from '../../../services/modules/auth'
import { NavigationActions } from 'react-navigation';

import RegisterScreen from '../components/RegisterScreen'

const mapDispatchToProps = {
    register: register,
}


const mapStateToProps = (state) => ({
    error : state.auth.error,
    fetching : state.auth.fetching,
    isLoggedIn : state.auth.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)