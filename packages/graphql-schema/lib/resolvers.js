import { PubSub } from 'graphql-subscriptions'

export const createResolvers = gpio => {
  const pubsub = new PubSub()
  gpio.on('change', (channel, value) => {
    pubsub.publish(`change-${channel}`, value)
  })

  return {
    Query: {
      async gpio () {
        return gpio.promise
      }
    },
    GPIO: {
      read (gpio, { channel }) {
        return gpio.read(channel)
      }
    },
    Mutation: {
      async gpioWrite (gpio, { channel, value }) {
        await gpio.write(channel, value)
        return gpio.read(channel)
      }
    },
    Subscription: {
      gpioChange: {
        resolve: source => source,
        subscribe: (obj, { channel }) =>
          pubsub.asyncIterator(`change-${channel}`)
      }
    }
  }
}
