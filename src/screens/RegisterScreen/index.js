import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'Register',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Register = require('./container/RegisterScreenContainer').default
      const reducer = require('../../services/modules/auth').default

      /*  Add the reducer to the store on key 'auth'  */
      injectReducer(store, { key: 'auth', reducer })

      /*  Return getComponent   */
      cb(null, Register)

    /* Webpack named bundle   */
    }, 'auth')
  }
})