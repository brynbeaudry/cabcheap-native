import request from '../request'
import querystring from 'query-string';

function register (user) {
  let username = user.username !== undefined ? user.username : `${user.email.split('@')[0]}`
  console.log('in register: ', `${user} \n Username ${username}`)
  return request({
    headers : {'Content-Type': 'application/json'},
    method : 'post',
    url: '/register',
    data : { email: user.email, password: user.password, username: username },
  })
}

function loginWithEmail (user) {
  return request({
    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
    url: '/login',
    method : 'POST',
    data : querystring.stringify({ 
      response_type : 'code',
      grant_type : 'password',
      username: user.email,
      password: user.password
    })
  })
}

function loginWithFacebook (facebook_access_token) {
  return request({
    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
    url: '/login',
    method : 'POST',
    data : querystring.stringify({ 
      response_type : 'code',
      grant_type : 'urn:ietf:params:oauth:grant-type:facebook_access_token',
      scope : 'openid profile email',
      assertion : facebook_access_token,
    })
  })
}

function loginWithGoogle (google_identity_token) {
  return request({
    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
    url: '/login',
    method : 'POST',
    data : querystring.stringify({ 
      response_type : 'code',
      grant_type : 'urn:ietf:params:oauth:grant-type:google_identity_token',
      scope : 'openid profile email',
      assertion : google_identity_token,
    })
  })
}

function logout () {
  return request({
    url: '/logout',
    method : 'POST'
  })
}

const AuthService = {
  register, loginWithEmail, loginWithFacebook, loginWithGoogle, logout,
}

export default AuthService
