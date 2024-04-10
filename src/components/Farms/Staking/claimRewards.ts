import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { getContract } from 'utils'

import { STAKER_ADDRESS } from './config'
import STAKER_ABI from './staker.json'

// eslint-disable-next-line import/no-unused-modules
export const useClaimRewards = () => {
  const { provider, account } = useWeb3React()

  const claimRewards = useCallback(
    async (rewardToken: any) => {
      if (!provider || !account || !rewardToken) {
        console.error('Invalid parameters for claiming rewards')
        return
      }

      const stakerContract = getContract(STAKER_ADDRESS, STAKER_ABI, provider, account)

      try {
        const claimRewardsTx = await stakerContract['claimReward(address,address,uint256)'](rewardToken, account, 0)
        await claimRewardsTx.wait()

        console.log('Claim successful')
      } catch (error) {
        console.error('Claim failed', error)
      }
    },
    [provider, account]
  )

  return claimRewards
}
