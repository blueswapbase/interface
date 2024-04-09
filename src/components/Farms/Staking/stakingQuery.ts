/* eslint-disable import/no-unused-modules */
import { gql } from '@apollo/client'

export const GET_STAKED_TOKENS = gql`
  query GetStakedTokens {
    tokenStakeds(orderBy: blockTimestamp, orderDirection: desc, where: { blockTimestamp_gt: "1710000000" }) {
      incentiveId
      tokenId
      id
    }
    depositTransferreds(orderBy: blockNumber, orderDirection: desc, where: { blockTimestamp_gt: "1710000000" }) {
      tokenId
      newOwner
      oldOwner
    }
    transfers(orderBy: blockNumber, orderDirection: desc, where: { blockTimestamp_gt: "1710000000" }) {
      to
      from
      tokenId
      blockNumber
    }
    incentiveCreateds(where: { blockTimestamp_gt: "1710000000" }, orderBy: blockTimestamp, orderDirection: desc) {
      reward
      pool
      startTime
      endTime
      refundee
      rewardToken
      id
    }
    incentiveEndeds(where: { blockTimestamp_gt: "1710000000" }, orderBy: blockTimestamp, orderDirection: desc) {
      incentiveId
      id
    }
    rewardClaimeds(orderBy: to, orderDirection: desc, where: { blockTimestamp_gt: "1710000000" }) {
      id
      reward
      to
    }
  }
`
