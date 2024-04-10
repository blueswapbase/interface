/* eslint-disable simple-import-sort/imports */
/* eslint-disable import/no-unused-modules */
import { ButtonPrimary } from 'components/Button'
import { DoubleCurrencyLogo } from 'components/AccountDrawer/MiniPortfolio/PortfolioLogo'
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useCurrency } from 'hooks/Tokens'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Currency } from 'blueswap-sdk-core'
import { getRewards } from '../Staking/getRewards'
import { Link } from 'react-router-dom'
import { useClaimRewards } from '../Staking/claimRewards'

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  justify-content: space-around;
`

const ActionButton = styled(ButtonPrimary)`
  padding: 0.5rem 1rem;
`

const AddLiquidityButton = styled(ButtonPrimary)`
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
  gap: 8px;
`
function formatNumberWithCommas(x: number) {
  return Intl.NumberFormat('en-US').format(x)
}

interface TokenRowProps {
  token0: string
  token1: string
  tokenId?: number
  incentive: any
  rewardToken: any
  onStake: (tokenId: number, incentive: any) => void
  onUnstake: (tokenId: number, incentive: any) => void
  isStaked: boolean
  rewards: any
  showAddLiquidity?: boolean
}

const TokenRow: React.FC<TokenRowProps> = ({
  token0,
  token1,
  tokenId,
  incentive,
  rewardToken,
  onStake,
  onUnstake,
  isStaked,
  showAddLiquidity,
}) => {
  const { chainId, account, provider } = useWeb3React()
  const token0Currency = useCurrency(token0)
  const token1Currency = useCurrency(token1)
  const rewardTokenCurrency = useCurrency(rewardToken)
  const rewardTokenString = rewardToken

  const claimRewards = useClaimRewards()
  const handleClaimRewards = async () => {
    const rewardToken = rewardTokenString

    await claimRewards(rewardToken)
  }

  const validCurrencies = [token0Currency, token1Currency].filter((currency): currency is Currency => !!currency)

  const [rewards, setRewards] = useState('Loading...')

  useEffect(() => {
    if (incentive && incentive.rewardToken && incentive.rewardToken !== '0x') {
      getRewards(incentive.rewardToken, account, provider)
        .then(setRewards)
        .catch((error) => {
          console.error('Failed to fetch rewards:', error)
          setRewards('Failed to load')
        })
    } else {
      setRewards('No rewards')
    }
  }, [incentive, tokenId, provider])

  const handleStake = () => {
    if (typeof tokenId === 'number') {
      onStake(tokenId, incentive)
    }
  }

  const handleUnstake = () => {
    if (typeof tokenId === 'number') {
      onUnstake(tokenId, incentive)
    }
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
        {parseInt(rewards) > 0 ? (
          <>
            <div>
              {formatNumberWithCommas(parseInt(rewards))} {rewardTokenCurrency?.name}
            </div>
            <ButtonPrimary onClick={handleClaimRewards}>Claim Rewards</ButtonPrimary>
          </>
        ) : (
          <div>No rewards available</div>
        )}
      </TokenInfo>
      <ActionContainer>
        {incentive ? (
          <>
            {showAddLiquidity ? (
              <ButtonPrimary as={Link} to={`/add/${token0}/${token1}/3000`}>
                Add Liquidity
              </ButtonPrimary>
            ) : (
              <>
                <ActionButton onClick={handleStake} disabled={false}>
                  Stake
                </ActionButton>
                <ActionButton onClick={handleUnstake} disabled={false}>
                  Unstake
                </ActionButton>
              </>
            )}
          </>
        ) : (
          <NoIncentiveMessage>No current incentives for this position</NoIncentiveMessage>
        )}
      </ActionContainer>
    </Row>
  )
}

export default TokenRow
