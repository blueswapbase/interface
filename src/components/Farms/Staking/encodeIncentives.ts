/* eslint-disable import/no-unused-modules */
import { encodeParameter } from 'web3-eth-abi'
import { keccak256 } from 'web3-utils'

export const getIncentiveKeyEncoded = (incentiveDetails: {
  rewardToken: any
  pool: any
  startTime: any
  endTime: any
  refundee: any
}) => {
  const tupleType = 'tuple(address,address,uint256,uint256,address)'
  const incentiveTuple = [
    incentiveDetails.rewardToken,
    incentiveDetails.pool,
    incentiveDetails.startTime,
    incentiveDetails.endTime,
    incentiveDetails.refundee,
  ]
  return encodeParameter(tupleType, incentiveTuple)
}

export const getIncentiveTuple = (incentiveDetails: {
  rewardToken: string
  pool: string
  startTime: number
  endTime: number
  refundee: string
}) => {
  const incentiveTuple = [
    incentiveDetails.rewardToken,
    incentiveDetails.pool,
    incentiveDetails.startTime,
    incentiveDetails.endTime,
    incentiveDetails.refundee,
  ]
  return incentiveTuple
}

export const getIncentiveKeyHashed = (
  incentiveKeyEncoded: string | number | bigint | Uint8Array | readonly number[]
) => {
  return keccak256(incentiveKeyEncoded)
}
