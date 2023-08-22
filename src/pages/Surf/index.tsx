import { Trans } from '@lingui/macro'
import { useIsMobile } from 'nft/hooks'
import styled from 'styled-components'
import { ThemedText } from 'theme'
import { useIsDarkMode } from 'theme/components/ThemeToggle'

import surfImage from '../../assets/images/surf.png'

const Image = styled.img`
  max-width: 510px;
  width: 100%;
  padding: 0 75px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled(Container)`
  gap: 30px;
`

const PageWrapper = styled(Container)`
  flex: 1;
  justify-content: center;
  gap: 50px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    justify-content: space-between;
    padding-top: 64px;
  }
`

export default function Surf() {
  const isDarkMode = useIsDarkMode()
  const isMobile = useIsMobile()

  const Title = isMobile ? ThemedText.LargeHeader : ThemedText.Hero
  const Paragraph = isMobile ? ThemedText.HeadlineMedium : ThemedText.HeadlineLarge

  return (
    <PageWrapper>
      <Header>
        <Container>
          <Title>Surf</Title>
          <Paragraph color="textSecondary">
            <Trans>Launching 8/22</Trans>
          </Paragraph>
        </Container>
        <Image src={surfImage} alt="Logo" />
      </Header>
    </PageWrapper>
  )
}
