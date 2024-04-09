/* eslint-disable import/no-unused-modules */
import { encodeParameter } from 'web3-eth-abi'
import { keccak256 } from 'web3-utils'

import incentivesConfig from './incentives-config.json'

interface Incentive {
  rewardToken: string
  poolAddress: string
  startDate: number
  endDate: number
  refundee: string
}

interface IncentivesConfig {
  tupleType: string
  incentives: Incentive[]
}

const { tupleType, incentives }: IncentivesConfig = incentivesConfig

export const getSelectedIncentiveTuple = (idx: number): (string | number)[] => {
  const selectedIncentive = incentives[idx]
  return [
    selectedIncentive.rewardToken,
    selectedIncentive.poolAddress,
    selectedIncentive.startDate,
    selectedIncentive.endDate,
    selectedIncentive.refundee,
  ]
}

export const getIncentiveKeyEncoded = (incentiveTuple: (string | number)[]): string => {
  return encodeParameter(tupleType, incentiveTuple) as string
}

export const getIncentiveKeyHashed = (incentiveKeyEncoded: string): string => {
  return keccak256(incentiveKeyEncoded)
}
