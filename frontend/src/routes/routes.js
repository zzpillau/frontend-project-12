const apiPath = '/api/v1'

export default {
  signup: () => [apiPath, 'signup'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  channels: () => [apiPath, 'channels'].join('/'),
  channelById: id => [apiPath, 'channels', id].join('/'),
  messages: () => [apiPath, 'messages'].join('/'),
  messageById: id => [apiPath, 'messages', id].join('/'),
}
