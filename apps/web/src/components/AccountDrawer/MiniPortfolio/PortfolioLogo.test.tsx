import { ChainId } from '@uniswap/sdk-core'
<<<<<<< HEAD:src/components/AccountDrawer/MiniPortfolio/PortfolioLogo.test.tsx
import { DAI_ARBITRUM } from 'blueswap-smart-order-router'
import { BRIDGED_USDC_ARBITRUM, DAI, USDC_MAINNET } from 'constants/tokens'
=======
import { DAI, DAI_ARBITRUM_ONE, USDC_ARBITRUM, USDC_MAINNET } from 'constants/tokens'
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/AccountDrawer/MiniPortfolio/PortfolioLogo.test.tsx
import { render } from 'test-utils/render'

import { PortfolioLogo } from './PortfolioLogo'

describe('PortfolioLogo', () => {
  it('renders without L2 icon', () => {
    const { container } = render(<PortfolioLogo chainId={ChainId.MAINNET} currencies={[DAI, USDC_MAINNET]} />)
    expect(container).toMatchSnapshot()
  })

  it('renders with L2 icon', () => {
    const { container } = render(
      <PortfolioLogo chainId={ChainId.ARBITRUM_ONE} currencies={[DAI_ARBITRUM_ONE, USDC_ARBITRUM]} />
    )
    expect(container).toMatchSnapshot()
  })
})
