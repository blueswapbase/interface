import { JsonRpcProvider } from '@ethersproject/providers'
import { formatUnits } from 'ethers/lib/utils'
import { getContract } from 'utils'

import { STAKER_ADDRESS } from './config'
import stakerABI from './staker.json'

export async function getRewards(rewardToken: any, account: string | undefined, provider: JsonRpcProvider | undefined) {
  if (!provider || !account || !rewardToken) return '0'

  const stakerContract = getContract(STAKER_ADDRESS, stakerABI, provider)

  // Directly call the rewards method. No need to access a 'methods' property.
  const rewardAmount = await stakerContract['rewards(address,address)'](rewardToken, account)
  const formattedRewardAmount = formatUnits(rewardAmount, 18)
  return Number(formattedRewardAmount).toFixed(4)
}
