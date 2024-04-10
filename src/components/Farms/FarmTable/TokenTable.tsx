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
import { getRewards } from '../Staking/getRewards'
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

const NoIncentivesMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  /* Add more styles as needed */
`

interface TokenTableProps {
  positions: PositionDetails[]
  onStake: (tokenId: number, incentive: any) => void
  onUnstake: (tokenId: number, incentive: any) => void
}

const TokenTable: React.FC<TokenTableProps> = ({ positions, onStake, onUnstake }) => {
  const { chainId, account, provider } = useWeb3React()
  const { data: stakedTokensData, loading: stakedTokensLoading, error: stakedTokensError } = useQuery(GET_STAKED_TOKENS)
  const { data: poolTokensData, loading: poolTokensLoading, error: poolTokensError } = useQuery(GET_POOL_TOKENS)
  const [rewards, setRewards] = useState('')
  const [ownedTokenIds, setOwnedTokenIds] = useState<Set<number>>(new Set())
  const [displayedPools, setDisplayedPools] = useState<Set<string>>(new Set())
  const [displayedIncentives, setDisplayedIncentives] = useState<Set<string>>(new Set())
  const [unaccountedIncentives, setUnaccountedIncentives] = useState<any[]>([])

  useEffect(() => {
    if (!chainId) return

    const newDisplayedPools = new Set<string>()
    positions.forEach((position) => {
      const tokenA = new Token(chainId, position.token0, 18)
      const tokenB = new Token(chainId, position.token1, 18)
      const poolAddress = computePoolAddress({
        factoryAddress: V3_CORE_FACTORY_ADDRESSES[chainId],
        tokenA,
        tokenB,
        fee: FeeAmount.MEDIUM,
      }).toLowerCase()

      newDisplayedPools.add(poolAddress)
    })
    setDisplayedPools(newDisplayedPools)
  }, [positions, chainId])

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

  useEffect(() => {
    // Identify unaccounted incentives
    if (!chainId) return
    const accountForIncentive = new Set()
    positions.forEach((position) => {
      const poolAddress = computePoolAddress({
        factoryAddress: V3_CORE_FACTORY_ADDRESSES[chainId],
        tokenA: new Token(chainId, position.token0, 18),
        tokenB: new Token(chainId, position.token1, 18),
        fee: FeeAmount.MEDIUM,
      }).toLowerCase()

      stakedTokensData?.incentiveCreateds.forEach((incentive: any) => {
        if (incentive.pool.toLowerCase() === poolAddress) {
          accountForIncentive.add(incentive.id)
        }
      })
    })

    const unaccounted = stakedTokensData?.incentiveCreateds.filter(
      (incentive: any) => !accountForIncentive.has(incentive.id)
    )
    setUnaccountedIncentives(unaccounted || [])
  }, [chainId, positions, stakedTokensData, poolTokensData])

  useEffect(() => {
    // Initialize displayedIncentives with all existing incentives
    stakedTokensData?.incentiveCreateds.forEach((incentive: any) => {
      setDisplayedIncentives((prev) => new Set(prev.add(incentive.id)))
    })
  }, [stakedTokensData])

  if (stakedTokensLoading || poolTokensLoading) return <div>Loading...</div>
  if (stakedTokensError) return <div>Error loading staked tokens data: {stakedTokensError.message}</div>
  if (poolTokensError) return <div>Error loading pool tokens data: {poolTokensError.message}</div>
  if (!chainId) return null

  const incentives = stakedTokensData?.incentiveCreateds ?? []

  let ownedTokenId: number | null = null

  const findTokensByPool = (poolAddress: string) => {
    return poolTokensData.poolCreateds.find((pool: { pool: string }) => pool.pool === poolAddress)
  }
  const validIncentives = incentives.filter(
    (incentive: { id: any; pool: any; rewardToken: any }) => incentive.id && incentive.pool && incentive.rewardToken
  )
  const noPositionsOrIncentives = positions.length === 0 && validIncentives.length === 0

  return (
    <GridContainer>
      {noPositionsOrIncentives ? (
        <NoIncentivesMessage>
          No incentives found on this chain. Try switching to Base or another chain to find current running incentives.
        </NoIncentivesMessage>
      ) : (
        <>
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
                rewardToken={incentive ? incentive.rewardToken : 'N/A'}
                isStaked={isOwnedByAccount}
                onStake={() => onStake(position.tokenId.toNumber(), incentive)}
                onUnstake={() => onUnstake(position.tokenId.toNumber(), incentive)}
                rewards={getRewards(incentive, account, provider)}
              />
            )
          })}
          {incentives.map(
            (
              incentive: { pool: any; id?: any; rewardToken: any; startTime: any; endTime: any; refundee: any },
              index: any
            ) => {
              if (incentive && 'id' in incentive) {
                if (!displayedIncentives.has(incentive.id)) {
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
                        parseInt(transfer.tokenId) === tokenId &&
                        transfer.newOwner.toLowerCase() === account?.toLowerCase()
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
                      rewardToken={incentive ? incentive.rewardToken : 'N/A'}
                      isStaked={isOwnedbyAccount}
                      onStake={() => (isOwnedbyAccount ? onStake(tokenId, incentive) : undefined)}
                      onUnstake={() => (isOwnedbyAccount ? onUnstake(tokenId, incentive) : undefined)}
                      rewards={incentive ? getRewards(incentive, account, provider) : 'N/A'}
                    />
                  ))
                } else {
                  return null
                }
              } else {
                console.warn('Encountered an undefined incentive or missing id property', incentive)
                return null
              }
            }
          )}
          {unaccountedIncentives.map((incentive, index) => {
            const poolTokens = poolTokensData?.poolCreateds.find(
              (pool: { pool: string }) => pool.pool === incentive.pool
            )
            if (!poolTokens) return null // Skip if pool not found

            return (
              <TokenRow
                key={`unaccounted-incentive-${index}`}
                token0={poolTokens.token0}
                token1={poolTokens.token1}
                incentive={incentive}
                rewardToken={incentive.rewardToken}
                isStaked={false}
                onStake={() => {}}
                onUnstake={() => {}}
                showAddLiquidity={true}
                rewards={getRewards(incentive.rewardToken, account, provider)}
              />
            )
          })}
        </>
      )}
    </GridContainer>
  )
}

export default TokenTable
