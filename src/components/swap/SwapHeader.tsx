import { Trans } from '@lingui/macro'
import { Percent } from 'blueswap-sdk-core'
import { InterfaceTrade } from 'state/routing/types'
import styled from 'styled-components'
import { ThemedText } from 'theme'

import { RowBetween, RowFixed } from '../Row'
import SettingsTab from '../Settings'
import SwapBuyFiatButton from './SwapBuyFiatButton'

const StyledSwapHeader = styled(RowBetween)`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.textSecondary};
`

const HeaderButtonContainer = styled(RowFixed)`
  padding: 0 12px;
  gap: 16px;
`

export default function SwapHeader({
  autoSlippage,
  chainId,
  trade,
}: {
  autoSlippage: Percent
  chainId?: number
  trade?: InterfaceTrade
}) {
  const fiatOnRampButtonEnabled = false

  return (
    <StyledSwapHeader>
      <HeaderButtonContainer>
        <ThemedText.SubHeader>
          <Trans>SWAP</Trans>
        </ThemedText.SubHeader>
        {fiatOnRampButtonEnabled && <SwapBuyFiatButton />}
      </HeaderButtonContainer>
      <RowFixed>
        <SettingsTab autoSlippage={autoSlippage} chainId={chainId} trade={trade} />
      </RowFixed>
    </StyledSwapHeader>
  )
}
