import 'expose-loader?_!lodash/fp'

_.mixin({
  mapi: require('lodash/fp/map').convert({ cap: false })
})
