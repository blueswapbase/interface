/* eslint-disable import/no-unused-modules */
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { getContract } from 'utils'

import { STAKER_ADDRESS } from './config'
import { getIncentiveTuple } from './encodeIncentives'
import tokenABI from './genericToken.json'
import stakerABI from './staker.json'

export const useCreateNewIncentive = () => {
  const { provider, account } = useWeb3React()
  const createNewIncentive = useCallback(
    async (incentiveDetails: any, rewardAmount: number) => {
      if (!provider || !account || !incentiveDetails || !rewardAmount) return

      const toWei = (amount: string | number | bigint | boolean) => {
        return BigInt(amount) * BigInt(10) ** BigInt(18)
      }
      const tokenContract = getContract(incentiveDetails.rewardToken, tokenABI, provider, account)
      const stakerContract = getContract(STAKER_ADDRESS, stakerABI, provider, account)

      const incentiveTuple = getIncentiveTuple(incentiveDetails)
      const amountInWei = toWei(rewardAmount)

      try {
        const approveTx = await tokenContract.functions.approve(STAKER_ADDRESS, amountInWei)
        await approveTx.wait()
        const createIncentiveTx = await stakerContract['createIncentive'](incentiveTuple, amountInWei)
        await createIncentiveTx.wait()

        console.log('Incentive created successfully')
      } catch (error) {
        console.error('Failed to create incentive:', error)
      }
    },
    [account, provider]
  ) // Ensure library is added as a dependency

  return { createNewIncentive }
}
