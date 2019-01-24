import { EventEmitter } from 'events'

let GPIO
let GPIOP

try {
  GPIO = require('rpi-gpio')
} catch (err) {
  console.log('GOT ERROR ON `rpi-gpio` require')
  console.error(err)
}

if (GPIO) {
  GPIOP = GPIO.promise
} else {
  console.log('USE GPIO mock')
  const mock = createGPIOMock()
  GPIO = mock.GPIO
  GPIOP = mock.GPIOP
}

function createGPIOMock () {
  const values = {
    // 'Motor: 1',
    25: 0,

    // 'Motor: 2',
    24: 0,

    // 'Motor: enable',
    4: 0,

    // 'Sensor: top',
    12: 1,

    // 'Sensor: bottom',
    16: 0
  }
  const event = new EventEmitter()

  const write = (id, value) => {
    values[id] = value
    event.emit('change', id, value)
  }

  const read = id => values[id] || 0

  const GPIO = {
    setMode () {},
    on (...args) {
      return event.on(...args)
    },
    MODE_BCM: 'MODE_BCM',
    DIR_IN: 'DIR_IN',
    DIR_OUT: 'DIR_OUT',
    EDGE_BOTH: 'EDGE_BOTH'
  }
  const GPIOP = {
    setup () {},
    read,
    write
  }

  return { GPIO, GPIOP }
}

export { GPIOP, GPIO }
