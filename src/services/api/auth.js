import request from '../request'
import querystring from 'query-string';
import { Facebook } from 'expo'

async function getFacebookToken () {
  const { type, token, expires = undefined } = await Facebook.logInWithReadPermissionsAsync(
    '162508234396151', 
    {permissions: ['public_profile', 'email']}
  );
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      //here, you should actually just post to get a token back from the server using connect token with the asertion grant.
      return token
    }else{
      return ""
    }
  }

function register (user) {
  let username = user.userName !== undefined ? user.userName : `${user.email.split('@')[0]}`
  console.log('auth api in register: ', `${user} \n Username ${username}`)
  let data = { email: user.email, password: user.password, userName: username, firstName : user.firstName, lastName : user.lastName }
  return request({
    headers : {'Content-Type': 'application/json'},
    method : 'post',
    url: '/api/register',
    data : data,
  })
}

function loginWithEmail (email, password) {
  return request({
    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
    url: '/connect/token',
    method : 'POST',
    data : querystring.stringify({ 
      response_type : 'code',
      grant_type : 'password',
      username: email,
      password: password
    })
  })
}

async function loginWithFacebook () {
  const facebook_access_token = await getFacebookToken()
  return request({
    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
    url: '/connect/token',
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
    url: '/connect/token',
    method : 'POST',
    data : querystring.stringify({ 
      response_type : 'code',
      grant_type : 'urn:ietf:params:oauth:grant-type:google_identity_token',
      scope : 'openid profile email',
      assertion : google_identity_token,
    })
  })
}

function logout (accessToken) {
  return request({
    headers : {'Authorization': `Bearer ${accessToken}`},
    url: '/connect/logout',
    method : 'POST'
  })
}

const AuthService = {
  register, loginWithEmail, loginWithFacebook, loginWithGoogle, logout,
}

export default AuthService
