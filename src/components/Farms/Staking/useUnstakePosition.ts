/* eslint-disable import/no-unused-modules */
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { getContract } from 'utils' // Ensure this utility function is correctly implemented

import { STAKER_ADDRESS } from './config' // Ensure the path and constant names are correct
import { getIncentiveKeyEncoded, getSelectedIncentiveTuple } from './encodeIncentives' // Ensure the path and function names are correct
import STAKER_ABI from './stakerV3.json' // Ensure the path and import name are correct

export const useUnstakePosition = () => {
  const { provider, account } = useWeb3React()

  const unstakePosition = useCallback(
    async (tokenId: number, idx: number) => {
      if (!provider || !account) return

      const stakerContract = getContract(STAKER_ADDRESS, STAKER_ABI, provider, account)

      try {
        // Unstake and withdraw token in a single transaction, if your contract supports it
        // Otherwise, you might need separate transactions for unstaking and withdrawing

        const selectedTuple = getSelectedIncentiveTuple(idx)
        const encodedIncentive = getIncentiveKeyEncoded(selectedTuple)

        // Assuming your staker contract has an 'unstakeAndWithdraw' function
        // Replace 'unstakeAndWithdraw' with the actual function name if different
        const unstakeTx = await stakerContract['unstakeAndWithdraw'](encodedIncentive, tokenId)
        await unstakeTx.wait()

        console.log('Unstaking successful')
      } catch (error) {
        console.error('Unstaking failed', error)
      }
    },
    [account, provider]
  )

  return { unstakePosition }
}
