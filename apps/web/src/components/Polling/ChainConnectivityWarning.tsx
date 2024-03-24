import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { ChainId } from 'blueswap-sdk-core'
import { getChainInfoOrDefault, L2ChainInfo } from 'constants/chainInfo'
import { AlertTriangle } from 'react-feather'
import styled from 'styled-components'
import { MEDIA_WIDTHS } from 'theme'
import { ExternalLink } from 'theme/components'

const BodyRow = styled.div`
  color: ${({ theme }) => theme.neutral1};
  font-size: 12px;
  font-weight: 485;
  font-size: 14px;
  line-height: 20px;
`
const CautionTriangle = styled(AlertTriangle)`
  color: ${({ theme }) => theme.deprecated_accentWarning};
`
const Link = styled(ExternalLink)`
  color: ${({ theme }) => theme.black};
  text-decoration: underline;
`
const TitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`
const TitleText = styled.div`
  color: ${({ theme }) => theme.neutral1};
  font-weight: 535;
  font-size: 16px;
  line-height: 24px;
  margin: 0px 12px;
`
const Wrapper = styled.div`
<<<<<<< HEAD:src/components/Polling/ChainConnectivityWarning.tsx
  background-color: ${({ theme }) => theme.backgroundSurface};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
=======
  background-color: ${({ theme }) => theme.surface1};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.surface3};
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/Polling/ChainConnectivityWarning.tsx
  bottom: 60px;
  z-index: 2;
  display: none;
  max-width: 348px;
  padding: 16px 20px;
  position: fixed;
  right: 16px;
  @media screen and (min-width: ${MEDIA_WIDTHS.deprecated_upToMedium}px) {
    display: block;
  }
`

export function ChainConnectivityWarning() {
  const { chainId } = useWeb3React()
  const info = getChainInfoOrDefault(chainId)
  const label = info?.label

  return (
    <Wrapper>
      <TitleRow>
        <CautionTriangle />
        <TitleText>
          <Trans>Network warning</Trans>
        </TitleText>
      </TitleRow>
      <BodyRow>
        {chainId === ChainId.MAINNET ? (
          <Trans>You may have lost your network connection.</Trans>
        ) : (
          <Trans>{label} might be down right now, or you may have lost your network connection.</Trans>
        )}{' '}
        {(info as L2ChainInfo).statusPage !== undefined && (
          <span>
            <Trans>Check network status</Trans>{' '}
            <Link href={(info as L2ChainInfo).statusPage || ''}>
              <Trans>here.</Trans>
            </Link>
          </span>
        )}
      </BodyRow>
    </Wrapper>
  )
}
