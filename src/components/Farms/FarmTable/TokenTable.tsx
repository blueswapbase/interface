/* eslint-disable react-hooks/rules-of-hooks */
import { computePoolAddress, FeeAmount } from '@uniswap/v3-sdk'
import { useWeb3React } from '@web3-react/core'
import { Token, V3_CORE_FACTORY_ADDRESSES } from 'blueswap-sdk-core'
import { ButtonPrimary } from 'components/Button'
import incentivesConfig from 'components/Farms/Staking/incentives-config.json'
import { useCurrency } from 'hooks/Tokens'
import React from 'react'
import styled from 'styled-components'
import { PositionDetails } from 'types/position'

import { MAX_WIDTH_MEDIA_BREAKPOINT } from '../constants'
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundOutline};
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`
const TokenDetailsContainer = styled.div`
  display: flex;
  align-items: center;
`

const TokenDetails = styled.div`
  margin-left: 0.5rem;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

const ActionButton = styled(ButtonPrimary)`
  padding: 0.5rem 1rem;
`
interface TokenTableProps {
  positions: PositionDetails[]
  onStake: (tokenId: number, incentiveIndex: number) => void
  onUnstake: (tokenId: number, incentiveIndex: number) => void
}

const TokenTable: React.FC<TokenTableProps> = ({ positions, onStake, onUnstake }) => {
  const { chainId } = useWeb3React()

  if (!chainId) {
    return null
  }

  const handleAddLiquidity = () => {
    console.log('Adding liquidity...')
  }

  const displayedIncentives = new Map()

  return (
    <GridContainer>
      <Header>
        <div>Pair</div>
        <div>Action</div>
      </Header>
      {positions.map((position, index) => {
        const tokenA = new Token(chainId, position.token0, 18)
        const tokenB = new Token(chainId, position.token1, 18)
        const poolAddress = computePoolAddress({
          factoryAddress: V3_CORE_FACTORY_ADDRESSES[chainId],
          tokenA,
          tokenB,
          fee: FeeAmount.MEDIUM, // Use the correct fee tier
        })
        const incentiveIndex = incentivesConfig.incentives.findIndex(
          (incentive) => incentive.poolAddress.toLowerCase() === poolAddress.toLowerCase()
        )
        if (incentiveIndex !== -1) {
          displayedIncentives.set(incentiveIndex, true)
        }
        return (
          <TokenRow
            key={index}
            position={position}
            incentiveIndex={incentiveIndex}
            onStake={(tokenId) => onStake(tokenId, incentiveIndex)}
            onUnstake={(tokenId) => onUnstake(tokenId, incentiveIndex)}
          />
        )
      })}
      {incentivesConfig.incentives.map((incentive, index) => {
        if (!displayedIncentives.has(index)) {
          // Hardcoded token details for the unmatched incentive
          // TODO: Fetch or determine real token details based on poolAddress
          const token0 = useCurrency(incentive.token0)
          const token1 = useCurrency(incentive.token1)

          return (
            <Row key={`incentive-${index}`}>
              <TokenDetailsContainer>
                <span>
                  {token0?.symbol}/{token1?.symbol}
                </span>
              </TokenDetailsContainer>
              <ActionsContainer>
                <ActionButton onClick={handleAddLiquidity}>Add Liquidity</ActionButton>
              </ActionsContainer>
            </Row>
          )
        }

        return null
      })}
    </GridContainer>
  )
}

export default TokenTable
