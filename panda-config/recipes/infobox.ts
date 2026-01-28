import type { SlotRecipeConfig } from '@pandacss/dev'

export const infoBox: SlotRecipeConfig = {
  className: 'info-box',
  description: 'Informational alert box',
  slots: ['root', 'title', 'icon', 'content'],
  base: {
    root: {
      p: 4,
      rounded: 'md',
      borderWidth: '1px',
      borderStyle: 'solid',
    },
    title: {
      fontWeight: 'semibold',
      mb: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    },
    icon: {
      display: 'inline-flex',
      fontSize: 'xl',
    },
    content: {
      lineHeight: '1.6',
      color: 'inherit',
    },
  },
  variants: {
    variant: {
      info: {
        root: {
          color: 'blue.900',
          backgroundColor: 'blue.50',
          borderColor: 'blue.300',
        },
      },
      warning: {
        root: {
          color: 'yellow.900',
          backgroundColor: 'yellow.50',
          borderColor: 'yellow.400',
        },
      },
      success: {
        root: {
          color: 'green.900',
          backgroundColor: 'green.50',
          borderColor: 'green.300',
        },
      },
      tip: {
        root: {
          color: 'purple.900',
          backgroundColor: 'purple.50',
          borderColor: 'purple.300',
        },
      },
    },
    wcagLevel: {
      A: {
        root: {
          borderColor: 'blue.200',
          backgroundColor: 'transparent',
        },
      },
      AA: {
        root: {
          borderColor: 'blue.300',
          backgroundColor: 'blue.50',
        },
      },
      AAA: {
        root: {
          borderColor: 'yellow.400',
          backgroundColor: 'yellow.100',
        },
      },
    },
    leftBorder: {
      true: {
        root: {
          borderLeftWidth: '4px',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'info',
    wcagLevel: 'AA',
  },
}
