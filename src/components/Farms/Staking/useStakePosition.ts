/* eslint-disable import/no-unused-modules */
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { getContract } from 'utils'

import { POSITION_ADDRESS, STAKER_ADDRESS } from '../Staking/config'
import { getIncentiveKeyEncoded, getIncentiveKeyHashed } from './encodeIncentives'
import positionABI from './positionManagerV3.json'
import stakerABI from './staker.json'

export const useStakePosition = () => {
  const { provider, account } = useWeb3React()
  const stakePosition = useCallback(
    async (tokenId: number, incentiveDetails: any) => {
      if (!provider || !account || !incentiveDetails) return

      const stakerContract = getContract(STAKER_ADDRESS, stakerABI, provider, account)
      const positionContract = getContract(POSITION_ADDRESS, positionABI, provider, account)

      const encodedIncentive = getIncentiveKeyEncoded(incentiveDetails)
      const hashedIncentive = getIncentiveKeyHashed(encodedIncentive)
      try {
        const approveTx = await positionContract.approve(STAKER_ADDRESS, tokenId)
        await approveTx.wait()

        const stakeTx = await positionContract['safeTransferFrom(address,address,uint256,bytes)'](
          account,
          STAKER_ADDRESS,
          tokenId,
          hashedIncentive
        )
        await stakeTx.wait()

        // const stakeTx = await positionContract['safeTransferFrom(address,address,uint256,bytes)'](
        // account,
        // STAKER_ADDRESS,
        // tokenId,
        // encodedIncentive
        // ).send({ from: account })
        // await stakeTx.wait()
        console.log('Staking successful')
      } catch (error) {
        console.error('Staking failed', error)
      }
    },
    [account, provider]
  )

  return { stakePosition }
}
