import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { MAX_WIDTH_MEDIA_BREAKPOINT } from 'components/Farms/constants'
import TokenTable from 'components/Farms/FarmTable/TokenTable'
import { useStakePosition } from 'components/Farms/Staking/useStakePosition'
import { useUnstakePosition } from 'components/Farms/Staking/useUnstakePosition'
import { filterStringAtom } from 'components/Farms/state'
import { useV3Positions } from 'hooks/useV3Positions'
import { useResetAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ThemedText } from 'theme'

const ExploreContainer = styled.div`
  width: 100%;
  min-width: 320px;
  padding: 68px 12px 0px;

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    padding-top: 48px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    padding-top: 20px;
  }
`

const TitleContainer = styled.div`
  margin-bottom: 32px;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  margin-left: auto;
  margin-right: auto;
  display: flex;
`

const Farm = () => {
  const { account } = useWeb3React()
  const { positions, loading: positionsLoading } = useV3Positions(account)
  const { stakePosition } = useStakePosition()
  const { unstakePosition } = useUnstakePosition()

  const resetFilterString = useResetAtom(filterStringAtom)
  const location = useLocation()

  useEffect(() => {
    resetFilterString()
  }, [location, resetFilterString])

  return (
    <ExploreContainer>
      <TitleContainer>
        <ThemedText.LargeHeader>
          <Trans>Farms & Incentives</Trans>
        </ThemedText.LargeHeader>
      </TitleContainer>
      {positionsLoading ? (
        <div>Loading...</div>
      ) : (
        <TokenTable positions={positions || []} onStake={stakePosition} onUnstake={unstakePosition} />
      )}
    </ExploreContainer>
  )
}

export default Farm
