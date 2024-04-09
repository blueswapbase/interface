/* eslint-disable import/no-unused-modules */
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/70098/loboswap-base/v0.0.3',
  cache: new InMemoryCache(),
})

export default client
