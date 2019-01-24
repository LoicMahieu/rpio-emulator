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
      read (obj, { channel }) {
        return gpio.promise.read(channel)
      }
    },
    Mutation: {
      async gpioWrite (obj, { channel, value }) {
        await gpio.promise.write(channel, value)
        return gpio.promise.read(channel)
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
