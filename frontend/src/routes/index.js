const apiPath = '/api/v1'
const publicPath = ''

export default {
  signup: () => [apiPath, 'signup'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
  mainPage: () => '/',
  loginPage: () => [publicPath, 'login'].join('/'),
  signupPage: () => [publicPath, 'signup'].join('/'),
  notFoundPage: () => [publicPath, '*'].join('/'),
}
