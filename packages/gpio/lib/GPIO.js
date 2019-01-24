try {
  module.exports = require('rpi-gpio')
} catch (err) {
  console.log('GOT ERROR ON `rpi-gpio` require')
  console.error(err)

  module.exports = require('./gpio-mock')
}
