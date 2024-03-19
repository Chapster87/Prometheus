import { createStyle } from '@gluestack-style/react';

export const TextareaInput = createStyle({
  p: '$2',
  color: '$textLight900',
  textAlignVertical: 'top',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '0%',
  props: {
    // @ts-ignore
    multiline: true,
    placeholderTextColor: '$textLight500',
  },
  _dark: {
    color: '$textDark50',
    props: {
      placeholderTextColor: '$textDark400',
    },
  },
  _web: {
    'cursor': 'text',
    ':disabled': {
      cursor: 'not-allowed',
    },
  },
});
