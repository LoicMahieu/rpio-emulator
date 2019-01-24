import { EventEmitter } from 'events'

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
  EDGE_BOTH: 'EDGE_BOTH',

  promise: {
    setup () {},
    read,
    write
  }
}

module.exports = GPIO
