import { createServer } from '..'
import gpio from '@rpi-gpio-emulator/gpio'

createServer(gpio).catch(err => {
  console.error(err)
  process.exit(1)
})
