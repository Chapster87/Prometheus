import { createStyle } from '@gluestack-style/react';

export const LinkText = createStyle({
  textDecoration: 'none',
  color: '$info700',
  _dark: {
    color: '$info300',
  },
});
