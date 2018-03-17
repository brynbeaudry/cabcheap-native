import { connect } from 'react-redux'

import MainScreen from '../components/MainScreen'

const mapDispatchToProps = {
}


const mapStateToProps = (state) => ({
    error : state.auth.error,
    fetching : state.auth.fetching,
    isLoggedIn : state.auth.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)