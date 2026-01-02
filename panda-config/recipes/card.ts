import type { SlotRecipeConfig } from '@pandacss/dev'

export const cardRecipe: SlotRecipeConfig = {
  className: 'card',
  description: 'Card component with title and content',
  slots: ['root', 'title', 'icon', 'content'],
  base: {
    root: {
      p: 6,
      bg: 'white',
      rounded: 'lg',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'gray.200',
      shadow: 'md',
      transition: 'all 0.2s',
    },
    title: {
      fontWeight: 'semibold',
      fontSize: 'xl',
      mb: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      color: 'gray.900',
    },
    icon: {
      display: 'inline-flex',
      fontSize: '2xl',
    },
    content: {
      lineHeight: '1.6',
      color: 'gray.700',
    },
  },
  variants: {
    variant: {
      default: {
        root: {
          _hover: {
            shadow: 'lg',
          },
        },
      },
      interactive: {
        root: {
          cursor: 'pointer',
          _hover: {
            shadow: 'lg',
            transform: 'translateY(-2px)',
          },
        },
      },
      bordered: {
        root: {
          borderWidth: '2px',
        },
      },
    },
    colorScheme: {
      blue: {
        root: {
          borderColor: 'blue.200',
          bg: 'blue.50',
        },
        title: {
          color: 'blue.900',
        },
      },
      green: {
        root: {
          borderColor: 'green.200',
          bg: 'green.50',
        },
        title: {
          color: 'green.900',
        },
      },
      yellow: {
        root: {
          borderColor: 'yellow.200',
          bg: 'yellow.50',
        },
        title: {
          color: 'yellow.900',
        },
      },
      red: {
        root: {
          borderColor: 'red.200',
          bg: 'red.50',
        },
        title: {
          color: 'red.900',
        },
      },
      gray: {
        root: {
          borderColor: 'gray.200',
          bg: 'gray.50',
        },
        title: {
          color: 'gray.900',
        },
      },
      purple: {
        root: {
          borderColor: 'purple.200',
          bg: 'purple.50',
        },
        title: {
          color: 'purple.900',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
}
