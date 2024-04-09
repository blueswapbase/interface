/* eslint-disable import/no-unused-modules */
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { getContract } from 'utils'

import { STAKER_ADDRESS } from './config'
import { getIncentiveTuple } from './encodeIncentives'
import STAKER_ABI from './staker.json'

export const useUnstakePosition = () => {
  const { provider, account } = useWeb3React()

  const unstakePosition = useCallback(
    async (tokenId: number, incentiveDetails: any) => {
      if (!provider || !account || !incentiveDetails) return

      const stakerContract = getContract(STAKER_ADDRESS, STAKER_ABI, provider, account)

      try {
        const incentiveTuple = getIncentiveTuple(incentiveDetails)

        console.log(stakerContract)
        const unstakeTx = await stakerContract.unstakeToken(incentiveTuple, tokenId)
        await unstakeTx.wait()

        const withdrawTx = await stakerContract.withdrawToken(tokenId, account, '0x')
        await withdrawTx.wait()

        // const incentiveTuple = getIncentiveTuple(incentiveDetails)
        //
        // console.log(stakerContract)
        // const unstakingCalls = [
        // stakerContract.unstakeToken(incentiveTuple, tokenId).encodeABI(),
        // stakerContract.withdrawToken(tokenId, account, '0x').encodeABI(),
        // ]
        //
        // await stakerContract['multicall(bytes[])'](unstakingCalls).send({ from: account })

        console.log('Unstaking successful')
      } catch (error) {
        console.error('Unstaking failed', error)
      }
    },
    [account, provider]
  )

  return { unstakePosition }
}
