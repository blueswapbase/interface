import { ApolloProvider } from '@apollo/client'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { ButtonPrimary } from 'components/Button'
import { MAX_WIDTH_MEDIA_BREAKPOINT } from 'components/Farms/constants'
import TokenTable from 'components/Farms/FarmTable/TokenTable'
import client from 'components/Farms/Staking/apolloClient'
//import CreateIncentiveModal from 'components/Farms/Staking/CreateIncentiveModal'
import { useStakePosition } from 'components/Farms/Staking/useStakePosition'
import { useUnstakePosition } from 'components/Farms/Staking/useUnstakePosition'
import { filterStringAtom } from 'components/Farms/state'
import { useV3Positions } from 'hooks/useV3Positions'
import { useResetAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  justify-content: space-between; /* Adjusts children to start and end of container */
  align-items: center; /* Vertically centers items in case they have different heights */
`

const ActionButton = styled(ButtonPrimary)`
  padding: 0.5rem 1rem;
  max-width: 200px;
`

const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`
// const [isModalOpen, setIsModalOpen] = useState(false)
// const handleOpenModal = () => {
// setIsModalOpen(true)
// }
//
// const handleCloseModal = () => {
// setIsModalOpen(false)
// }

const ErrorMessage = styled.div`
  color: red;
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

  //if (positionsError) return <ErrorMessage>Error loading positions.</ErrorMessage>

  return (
    <ApolloProvider client={client}>
      <ExploreContainer>
        <TitleContainer>
          <ThemedText.LargeHeader>
            <Trans>Farms & Incentives</Trans>
          </ThemedText.LargeHeader>
          <ActionButton as={Link} to="/create-farm">
            Create New Farm
          </ActionButton>
        </TitleContainer>
        <TokenTable positions={positions || []} onStake={stakePosition} onUnstake={unstakePosition} />
      </ExploreContainer>
    </ApolloProvider>
  )
}

export default Farm
