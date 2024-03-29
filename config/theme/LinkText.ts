import { createStyle } from '@gluestack-style/react';

export const LinkText = createStyle({
  textDecoration: 'underline',
  color: '$info700',
  _dark: {
    color: '$info300',
  },
  _web: {
    textDecoration: 'underline',
    color: '$info700',
  },
  variants: {
    link: {
      true: {
        color: '$info700',
        _dark: {
          color: '$info300',
        }
      }
    }
  },
  defaultProps: {
    link: true, // fixes stupid bug causing Text defautl to change color
  },
});
