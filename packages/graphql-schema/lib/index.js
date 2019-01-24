import fs from 'fs'
import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { createResolvers } from './resolvers'

export const createSchema = (gpio) => makeExecutableSchema({
  typeDefs: [fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')],
  resolvers: createResolvers(gpio)
})
