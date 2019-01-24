import React from 'react'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider as DefaultApolloProvider } from 'react-apollo'

const httpLink = new HttpLink({
  uri: `http://${window.location.hostname}:4000/graphql`
})

const wsLink = new WebSocketLink({
  uri: `ws://${window.location.hostname}:4000/graphql`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const cache = new InMemoryCache()

export const client = new ApolloClient({
  link,
  cache
})

export const ApolloProvider = props => (
  <DefaultApolloProvider client={client} {...props} />
)
