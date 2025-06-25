const apiPath = '/api/v1'
const root = ''

export default {
  signup: () => [apiPath, 'signup'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
  mainPage: () => [root, ''].join('/'),
  loginPage: () => [root, 'login'].join('/'),
  signupPage: () => [root, 'signup'].join('/'),
  notFoundPage: () => [root, '*'].join('/'),
}
