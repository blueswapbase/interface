/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@apollo/client'
import { computePoolAddress, FeeAmount } from '@uniswap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { Token, V3_CORE_FACTORY_ADDRESSES } from 'blueswap-sdk-core'
import { GET_POOL_TOKENS } from 'components/Farms/Staking/poolsQuery'
import { GET_STAKED_TOKENS } from 'components/Farms/Staking/stakingQuery'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PositionDetails } from 'types/position'

import { MAX_WIDTH_MEDIA_BREAKPOINT } from '../constants'
import { getIncentiveKeyEncoded, getIncentiveKeyHashed } from '../Staking/encodeIncentives'
import TokenRow from './TokenRow'

const GridContainer = styled.div`
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  background-color: ${({ theme }) => theme.backgroundSurface};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 24px rgba(0, 0, 0, 0.04),
    0 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 5px;
  margin: auto;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
`

const TitleContainer = styled.div`
  margin-bottom: 10px;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 10px;
  justify-content: space-around; /* Center title if desired */
  border-bottom: 1px solid ${({ theme }) => theme.backgroundOutline};
`
interface TokenTableProps {
  positions: PositionDetails[]
  onStake: (tokenId: number, incentive: any) => void
  onUnstake: (tokenId: number, incentive: any) => void
}

const TokenTable: React.FC<TokenTableProps> = ({ positions, onStake, onUnstake }) => {
  const { chainId, account } = useWeb3React()
  const { data: stakedTokensData, loading: stakedTokensLoading, error: stakedTokensError } = useQuery(GET_STAKED_TOKENS)
  const { data: poolTokensData, loading: poolTokensLoading, error: poolTokensError } = useQuery(GET_POOL_TOKENS)

  const [ownedTokenIds, setOwnedTokenIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (stakedTokensData && account) {
      const ownedIds = new Set<number>(
        stakedTokensData.tokenStakeds
          .filter((staked: { newOwner: string; tokenId: string }) => staked.newOwner === account)
          .map((staked: { tokenId: string }) => Number(staked.tokenId))
      )
      setOwnedTokenIds(ownedIds)
    }
  }, [stakedTokensData, account])

  if (stakedTokensLoading || poolTokensLoading) return <div>Loading...</div>
  if (stakedTokensError) return <div>Error loading staked tokens data: {stakedTokensError.message}</div>
  if (poolTokensError) return <div>Error loading pool tokens data: {poolTokensError.message}</div>

  if (stakedTokensLoading || poolTokensLoading) return <div>Loading...</div>
  if (stakedTokensError || poolTokensError) return <div>Error loading data</div>
  if (!chainId) return null

  const displayedIncentives = new Set()
  let ownedTokenId: number | null = null

  const findTokensByPool = (poolAddress: string) => {
    return poolTokensData.poolCreateds.find((pool: { pool: string }) => pool.pool === poolAddress)
  }

  return (
    <GridContainer>
      <TitleContainer>
        <div>Pair</div>
        <div>Position ID</div>
        <div>Rewards</div>
        <div>Action</div>
      </TitleContainer>
      {positions.map((position, index) => {
        const tokenA = new Token(chainId, position.token0, 18)
        const tokenB = new Token(chainId, position.token1, 18)
        const poolAddress = computePoolAddress({
          factoryAddress: V3_CORE_FACTORY_ADDRESSES[chainId],
          tokenA,
          tokenB,
          fee: FeeAmount.MEDIUM, // Adjust based on your fee tier
        }).toLowerCase()

        const incentive = stakedTokensData.incentiveCreateds.find(
          (inc: { pool: string }) => inc.pool.toLowerCase() === poolAddress
        )
        if (incentive) displayedIncentives.add(incentive.id)

        let isOwnedByAccount = false
        stakedTokensData.tokenStakeds.forEach((staked: { tokenId: string }) => {
          const ownedByAccount = stakedTokensData.depositTransferreds.some(
            (transfer: { tokenId: string; newOwner: string }) => {
              const isOwned =
                transfer.tokenId === staked.tokenId && transfer.newOwner.toLowerCase() === account?.toLowerCase()
              if (isOwned && isOwned != null) {
                ownedTokenId = Number(staked.tokenId) // Update the ownedTokenId
              }
              //console.log(ownedTokenId)
              //console.log()
              return isOwned
            }
          )
          if (ownedByAccount) {
            isOwnedByAccount = true
          }
          //console.log(isOwnedByAccount)
        })
        return (
          <TokenRow
            key={index}
            token0={position.token0}
            token1={position.token1}
            tokenId={parseInt(position.tokenId._hex)}
            incentive={incentive}
            isStaked={isOwnedByAccount}
            onStake={() => onStake(position.tokenId.toNumber(), incentive)}
            onUnstake={() => onUnstake(position.tokenId.toNumber(), incentive)}
          />
        )
      })}
      {stakedTokensData.incentiveCreateds
        .filter((incentive: { id: string }) => !displayedIncentives.has(incentive.id))
        .map((incentive: any, index: number) => {
          const poolTokens = findTokensByPool(incentive.pool)
          if (!poolTokens) return null // Skip if pool not found

          const tokenA = new Token(chainId, poolTokens.token0, 18)
          const tokenB = new Token(chainId, poolTokens.token1, 18)

          const tokenIdsForIncentive: number[] = stakedTokensData.tokenStakeds
            .filter(
              (staked: { incentiveId: string }) =>
                staked.incentiveId === getIncentiveKeyHashed(getIncentiveKeyEncoded(incentive))
            )
            .map((staked: { tokenId: string }) => parseInt(staked.tokenId))
            .filter((tokenId: number) => !isNaN(tokenId))

          const ownedTokenIdsForIncentive = tokenIdsForIncentive.filter((tokenId: number) =>
            stakedTokensData.depositTransferreds.some(
              (transfer: { tokenId: string; newOwner: string }) =>
                parseInt(transfer.tokenId) === tokenId && transfer.newOwner.toLowerCase() === account?.toLowerCase()
            )
          )

          const latestTransfers = stakedTokensData.transfers.reduce(
            (acc: { [x: string]: any }, transfer: { tokenId: string | number; blockNumber: number }) => {
              // If the transfer tokenId is not already in the accumulator, or the blockNumber is higher, update the accumulator
              if (!acc[transfer.tokenId] || acc[transfer.tokenId].blockNumber < transfer.blockNumber) {
                acc[transfer.tokenId] = transfer
              }
              return acc
            },
            {}
          )

          const ownedStakedTokenIdsForIncentive = ownedTokenIdsForIncentive.filter((tokenId) => {
            const latestTransfer = latestTransfers[tokenId]
            //console.log(latestTransfer)
            if (!latestTransfer) return false // No transfer found for this tokenId, should not happen but added for safety
            // If the latest transfer was 'from' the account, it's still staked. Otherwise, it's not.
            return latestTransfer.from.toLowerCase() === account?.toLowerCase()
          })

          //console.log(ownedStakedTokenIdsForIncentive)

          let isOwnedbyAccount = false
          if (ownedTokenIdsForIncentive.length > 0)
            // && ownedStakedTokenIdsForIncentive.length > 0)
            isOwnedbyAccount = true
          //console.log(isOwnedbyAccount)

          return ownedTokenIdsForIncentive.map((tokenId: number, tokenIdIndex: any) => (
            <TokenRow
              key={`incentive-${index}-token-${tokenIdIndex}`}
              token0={tokenA.address}
              token1={tokenB.address}
              tokenId={tokenId}
              incentive={incentive}
              isStaked={isOwnedbyAccount}
              onStake={() => (isOwnedbyAccount ? onStake(tokenId, incentive) : undefined)}
              onUnstake={() => (isOwnedbyAccount ? onUnstake(tokenId, incentive) : undefined)}
            />
          ))
        })}
    </GridContainer>
  )
}

export default TokenTable
