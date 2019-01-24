import { ApolloServer } from 'apollo-server-express'
import { createSchema } from '@rpi-gpio-emulator/graphql-schema'
import { dirname } from 'path'

export const createServer = async (
  gpio,
  { port, frontendStaticPath } = {
    port: 4000
  }
) => {
  const express = require('express')
  const server = new ApolloServer({ schema: createSchema(gpio) })

  const app = express()
  server.applyMiddleware({ app })

  if (frontendStaticPath !== false) {
    app.use(
      express.static(
        frontendStaticPath ||
          dirname(require.resolve('@rpi-gpio-emulator/frontend'))
      )
    )
  }

  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}`
    )
  )
}
