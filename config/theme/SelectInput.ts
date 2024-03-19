import { createStyle } from '@gluestack-style/react';

export const SelectInput = createStyle({
  _web: {
    w: '$full',
  },
  pointerEvents: 'none',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '0%',
  h: '$full',
  color: '$textLight900',
  props: {
    placeholderTextColor: '$textLight500',
  },
  _dark: {
    color: '$textDark50',
    props: {
      placeholderTextColor: '$textDark400',
    },
  },
});
