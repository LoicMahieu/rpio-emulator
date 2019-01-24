import { ApolloServer } from 'apollo-server'
import get from 'lodash/get'
import { schema } from '@rpi-gpio-emulator/graphql-schema'

const server = new ApolloServer({
  schema,
  subscriptions: {},
  formatError: error => {
    console.error(error)
    console.error(get(error, 'originalError.stack', '[no stack]'))
    return error
  }
})

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
