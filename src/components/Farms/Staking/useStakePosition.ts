/* eslint-disable import/no-unused-modules */
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { getContract } from 'utils'
import Web3 from 'web3'

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
      console.log(encodedIncentive)
      const hashedIncentive = getIncentiveKeyHashed(encodedIncentive)
      console.log(hashedIncentive)
      try {
        console.log(STAKER_ADDRESS, tokenId)

        console.log(positionContract)

        const stakingCalls = [
          positionContract.interface.encodeFunctionData('approve', [STAKER_ADDRESS, tokenId]),
          positionContract.interface.encodeFunctionData('safeTransferFrom(address,address,uint256,bytes)', [
            account,
            STAKER_ADDRESS,
            tokenId,
            encodedIncentive,
          ]),
        ]

        const bytesArray = stakingCalls.map((hex) => Web3.utils.hexToBytes(hex))
        const approveAndStake = await positionContract.multicall(bytesArray)
        await approveAndStake.wait()

        // const approveTx = await positionContract.approve(STAKER_ADDRESS, tokenId)
        // await approveTx.wait()
        // console.log('Approved')
        // const stakeTx = await positionContract['safeTransferFrom(address,address,uint256,bytes)'](
        // account,
        // STAKER_ADDRESS,
        // tokenId,
        // encodedIncentive
        // )
        // await stakeTx.wait()
        // console.log('Staked')

        // const unstakingCalls = [
        // stakerContract.interface.encodeFunctionData('unstakeToken', [incentiveTuple, tokenId]),
        // stakerContract.interface.encodeFunctionData('withdrawToken', [tokenId, account, []]),
        // ]
        // const bytesArray = unstakingCalls.map((hex) => Web3.utils.hexToBytes(hex))
        // const unstakeAndWithdraw = await stakerContract.multicall(bytesArray)
        // await unstakeAndWithdraw.wait()
        //

        // const stakingCalls = [
        // positionContract.approve(STAKER_ADDRESS, tokenId).encodeABI(),
        // positionContract.methods.safeTransferFrom(account, STAKER_ADDRESS, tokenId, hashedIncentive).encodeABI(),
        // ]
        //
        // await positionContract.multicall(stakingCalls).send({ from: account })
        //
        console.log('Staking successful')
      } catch (error) {
        console.error('Staking failed', error)
      }
    },
    [account, provider]
  )

  return { stakePosition }
}
