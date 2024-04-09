/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-unused-modules */
import { ButtonPrimary } from 'components/Button'
import { DoubleCurrencyLogo } from 'components/AccountDrawer/MiniPortfolio/PortfolioLogo'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { PositionDetails } from 'types/position'
import { useCurrency } from 'hooks/Tokens'

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`

const TokenDetails = styled.div`
  margin-left: 0.5rem;
`

const ActionButton = styled(ButtonPrimary)`
  padding: 0.5rem 1rem;
`
const NoIncentiveMessage = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`

interface TokenRowProps {
  position: PositionDetails
  incentiveIndex: number
  onStake: (tokenId: number, incentiveIndex: number) => void
  onUnstake?: (tokenId: number, incentiveIndex: number) => void
}

const TokenRow: React.FC<TokenRowProps> = ({ position, incentiveIndex, onStake, onUnstake }) => {
  const { chainId } = useWeb3React()
  const token0 = useCurrency(position.token0)
  const token1 = useCurrency(position.token1)

  const hasIncentive = incentiveIndex >= 0

  const handleStake = () => {
    onStake(position.tokenId.toNumber(), incentiveIndex)
  }

  const handleUnstake = () => {
    if (onUnstake) {
      onUnstake(position.tokenId.toNumber(), incentiveIndex)
    }
  }

  return (
    <Row>
      <TokenDetails>
        {chainId && token0 && token1 && (
          <DoubleCurrencyLogo chainId={chainId} currencies={[token0, token1]} size="24px" />
        )}
        <div>
          {token0?.symbol}/{token1?.symbol}
        </div>
      </TokenDetails>
      <div>
        {incentiveIndex !== -1 ? (
          <>
            <ActionButton onClick={handleStake} disabled={!hasIncentive}>
              Stake
            </ActionButton>
            {onUnstake && (
              <ActionButton onClick={handleUnstake} disabled={!hasIncentive}>
                Unstake
              </ActionButton>
            )}
          </>
        ) : (
          <NoIncentiveMessage>No current incentives for this position</NoIncentiveMessage>
        )}
      </div>
    </Row>
  )
}

export default TokenRow
