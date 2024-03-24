import { style } from '@vanilla-extract/css'

import { sprinkles, vars } from '../../nft/css/sprinkles.css'

export const navIcon = style([
  sprinkles({
    alignItems: 'center',
    background: 'transparent',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
<<<<<<< HEAD:src/components/NavBar/NavIcon.css.ts
    borderRadius: '4',
=======
    borderRadius: '16',
>>>>>>> 18fd136a76bbfa36a06352c87bde60ff3ffe6bce:apps/web/src/components/NavBar/NavIcon.css.ts
    transition: '250',
  }),
  {
    ':hover': {
      background: vars.color.lightGrayOverlay,
    },
    zIndex: 1,
    transform: `translateY(-1px) translateX(4px)`,
  },
])
