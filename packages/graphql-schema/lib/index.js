import fs from 'fs'
import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

export const schema = makeExecutableSchema({
  typeDefs: [fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')],
  resolvers
})
