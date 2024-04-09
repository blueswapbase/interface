/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-unused-modules */
import { ButtonPrimary } from 'components/Button'
import { DoubleCurrencyLogo } from 'components/AccountDrawer/MiniPortfolio/PortfolioLogo'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useCurrency } from 'hooks/Tokens'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Currency } from 'blueswap-sdk-core'

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0px;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundOutline};
  margin-left: auto;
  margin-right: auto;
`
const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-around; // Adjust the spacing between elements as needed
`

const ActionButton = styled(ButtonPrimary)`
  padding: 0.5rem 1rem;
`
const NoIncentiveMessage = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`
const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 8px; // Adjust based on your design
`

interface TokenRowProps {
  token0: string
  token1: string
  tokenId: number // Accept tokenId directly
  incentive: any
  onStake: (tokenId: number, incentive: any) => void
  onUnstake: (tokenId: number, incentive: any) => void
  isStaked: boolean
}

const TokenRow: React.FC<TokenRowProps> = ({ token0, token1, tokenId, incentive, onStake, onUnstake, isStaked }) => {
  const { chainId } = useWeb3React()
  const token0Currency = useCurrency(token0)
  const token1Currency = useCurrency(token1)

  const validCurrencies = [token0Currency, token1Currency].filter((currency): currency is Currency => !!currency)

  const handleStake = () => {
    onStake(tokenId, incentive)
    console.log(tokenId)
    console.log(incentive)
    console.log(onStake)
  }

  const handleUnstake = () => {
    onUnstake(tokenId, incentive)
    console.log(tokenId)
    console.log(incentive)
    console.log(onUnstake)
  }

  return (
    <Row>
      <TokenInfo>
        {chainId && token0 && token1 && (
          <DoubleCurrencyLogo chainId={chainId} currencies={validCurrencies} size="24px" />
        )}
        <div>
          {token0Currency?.symbol}/{token1Currency?.symbol}
        </div>
      </TokenInfo>
      <TokenInfo>
        <div>{tokenId}</div>
      </TokenInfo>
      <TokenInfo>
        <div></div>
      </TokenInfo>
      <ActionContainer>
        {incentive ? (
          <>
            <ActionButton onClick={handleStake} disabled={false}>
              Stake
            </ActionButton>
            <ActionButton onClick={handleUnstake} disabled={false}>
              Unstake
            </ActionButton>
          </>
        ) : (
          <NoIncentiveMessage>No current incentives for this position</NoIncentiveMessage>
        )}
      </ActionContainer>
    </Row>
  )
}

export default TokenRow
