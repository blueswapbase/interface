/* eslint-disable import/no-unused-modules */
import { gql } from '@apollo/client'

export const GET_POOL_TOKENS = gql`
  query GetPoolTokens {
    poolCreateds(orderBy: blockTimestamp, orderDirection: desc) {
      pool
      token0
      token1
      fee
    }
  }
`
