import { GPIOP, GPIO } from '@rpi-gpio-emulator/gpio'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()
GPIO.on('change', (channel, value) => {
  pubsub.publish(`change-${channel}`, value)
})

const resolvers = {
  Query: {
    async gpio () {
      return GPIOP
    }
  },
  GPIO: {
    read (obj, { channel }) {
      return obj.read(channel)
    }
  },
  Mutation: {
    async gpioWrite (obj, { channel, value }) {
      await GPIOP.write(channel, value)
      return GPIOP.read(channel)
    }
  },
  Subscription: {
    gpioChange: {
      resolve: source => source,
      subscribe: (obj, { channel }) => pubsub.asyncIterator(`change-${channel}`)
    }
  }
}

export default resolvers
