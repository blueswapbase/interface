import { style } from '@vanilla-extract/css'

import { sprinkles } from '../../nft/css/sprinkles.css'

const baseNavDropdown = style([
  sprinkles({
    background: 'backgroundSurface',
    borderStyle: 'solid',
    borderColor: 'backgroundOutline',
    borderWidth: '2px',
    paddingBottom: '8',
    paddingTop: '8',
  }),
])

export const NavDropdown = style([
  baseNavDropdown,
  sprinkles({
    position: 'absolute',
    borderRadius: '4',
    borderColor: 'backgroundOutline',
    borderWidth: '2px',
  }),
  { boxShadow: '0px 4px 12px 0px #00000026' },
])

export const mobileNavDropdown = style([
  baseNavDropdown,
  sprinkles({
    position: 'fixed',
    borderTopRightRadius: '4',
    borderTopLeftRadius: '4',
    top: 'unset',
    bottom: '50',
    left: '0',
    right: '0',
    width: 'full',
  }),
  {
    borderRightWidth: '0px',
    borderLeftWidth: '0px',
  },
])
