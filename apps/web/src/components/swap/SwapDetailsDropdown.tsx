import { Trans } from '@lingui/macro'
import { BrowserEvent, InterfaceElementName, SwapEventName } from '@uniswap/analytics-events'
import { TraceEvent, useTrace } from 'analytics'
import { Percent } from 'blueswap-sdk-core'
import AnimatedDropdown from 'components/AnimatedDropdown'
import Column from 'components/Column'
import { LoadingOpacityContainer } from 'components/Loader/styled'
import { RowBetween, RowFixed } from 'components/Row'
import { formatCommonPropertiesForTrade } from 'lib/utils/analytics'
import { useState } from 'react'
import { ChevronDown } from 'react-feather'
import { InterfaceTrade } from 'state/routing/types'
import { isSubmittableTrade } from 'state/routing/utils'
import styled, { useTheme } from 'styled-components'
import { ThemedText } from 'theme/components'
import { useFormatter } from 'utils/formatNumbers'

import GasEstimateTooltip from './GasEstimateTooltip'
import SwapLineItem, { SwapLineItemType } from './SwapLineItem'
import TradePrice from './TradePrice'

const StyledHeaderRow = styled(RowBetween)<{ disabled: boolean; open: boolean }>`
  padding: 0;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
`

const RotatingArrow = styled(ChevronDown)<{ open?: boolean }>`
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'none')};
  transition: transform 0.1s linear;
`

<<<<<<< HEAD:src/components/swap/SwapDetailsDropdown.tsx
const StyledPolling = styled.div`
  display: flex;
  height: 16px;
  width: 16px;
  margin-right: 2px;
  margin-left: 10px;
  align-items: center;
  color: ${({ theme }) => theme.textPrimary};
  transition: 250ms ease color;

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    display: none;
  `}
`

const StyledPollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  border-radius: 5px;
  position: relative;
  background-color: ${({ theme }) => theme.backgroundInteractive};
  transition: 250ms ease background-color;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme }) => theme.textPrimary};
  background: transparent;
  width: 14px;
  height: 14px;
  border-radius: 5px;
  position: relative;
  transition: 250ms ease border-color;
  left: -3px;
  top: -3px;
`

const SwapDetailsWrapper = styled.div`
=======
const SwapDetailsWrapper = styled(Column)`
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/swap/SwapDetailsDropdown.tsx
  padding-top: ${({ theme }) => theme.grids.md};
`

const Wrapper = styled(Column)`
<<<<<<< HEAD:src/components/swap/SwapDetailsDropdown.tsx
  border: 2px solid ${({ theme }) => theme.backgroundOutline};
  border-radius: 5px;
=======
  border-radius: 16px;
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/swap/SwapDetailsDropdown.tsx
  padding: 12px 16px;
`

interface SwapDetailsProps {
  trade?: InterfaceTrade
  syncing: boolean
  loading: boolean
  allowedSlippage: Percent
}

export default function SwapDetailsDropdown(props: SwapDetailsProps) {
  const { trade, syncing, loading, allowedSlippage } = props
  const theme = useTheme()
  const [showDetails, setShowDetails] = useState(false)
  const trace = useTrace()

  return (
    <Wrapper>
      <TraceEvent
        events={[BrowserEvent.onClick]}
        name={SwapEventName.SWAP_DETAILS_EXPANDED}
        element={InterfaceElementName.SWAP_DETAILS_DROPDOWN}
        properties={{
          ...(trade ? formatCommonPropertiesForTrade(trade, allowedSlippage) : {}),
          ...trace,
        }}
        shouldLogImpression={!showDetails}
      >
        <StyledHeaderRow
          data-testid="swap-details-header-row"
          onClick={() => setShowDetails(!showDetails)}
          disabled={!trade}
          open={showDetails}
        >
          <RowFixed>
            {trade ? (
              <LoadingOpacityContainer $loading={syncing} data-testid="trade-price-container">
                <TradePrice price={trade.executionPrice} />
              </LoadingOpacityContainer>
            ) : loading || syncing ? (
              <ThemedText.DeprecatedMain fontSize={14}>
                <Trans>Fetching best price...</Trans>
              </ThemedText.DeprecatedMain>
            ) : null}
          </RowFixed>
          <RowFixed gap="xs">
            {!showDetails && isSubmittableTrade(trade) && (
              <GasEstimateTooltip trade={trade} loading={syncing || loading} />
            )}
            <RotatingArrow stroke={trade ? theme.neutral3 : theme.surface2} open={Boolean(trade && showDetails)} />
          </RowFixed>
        </StyledHeaderRow>
      </TraceEvent>
      <AdvancedSwapDetails {...props} open={showDetails} />
    </Wrapper>
  )
}

function AdvancedSwapDetails(props: SwapDetailsProps & { open: boolean }) {
  const { open, trade, allowedSlippage, syncing = false } = props
  const format = useFormatter()

  if (!trade) return null

  const lineItemProps = { trade, allowedSlippage, format, syncing }

  return (
    <AnimatedDropdown open={open}>
      <SwapDetailsWrapper gap="md" data-testid="advanced-swap-details">
        <SwapLineItem {...lineItemProps} type={SwapLineItemType.PRICE_IMPACT} />
        <SwapLineItem {...lineItemProps} type={SwapLineItemType.MAX_SLIPPAGE} />
        <SwapLineItem {...lineItemProps} type={SwapLineItemType.INPUT_TOKEN_FEE_ON_TRANSFER} />
        <SwapLineItem {...lineItemProps} type={SwapLineItemType.OUTPUT_TOKEN_FEE_ON_TRANSFER} />
        <SwapLineItem {...lineItemProps} type={SwapLineItemType.SWAP_FEE} />
        <SwapLineItem {...lineItemProps} type={SwapLineItemType.NETWORK_COST} />
        <SwapLineItem {...lineItemProps} type={SwapLineItemType.ROUTING_INFO} />
      </SwapDetailsWrapper>
    </AnimatedDropdown>
  )
}
