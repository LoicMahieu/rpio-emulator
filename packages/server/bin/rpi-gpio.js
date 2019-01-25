#!/usr/bin/env node

require('loud-rejection/register')

require = require('esm')(module /*, options */) // eslint-disable-line no-global-assign
module.exports = require('./_rpi-gpio.js')
