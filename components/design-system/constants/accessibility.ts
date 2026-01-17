import { token } from '~/styled-system/tokens'

export const WCAG_LEVELS = ['A', 'AA', 'AAA'] as const
export type WCAGLevel = (typeof WCAG_LEVELS)[number]
export type ComponentWCAGLevel = WCAGLevel

type FocusStyle = {
  background: string
  outline: string
  outlineWidth: string
  outlineOffset: string
  text: string
}

export const focusStyles: Record<WCAGLevel, FocusStyle> = {
  A: {
    background: 'transparent',
    outline: token('colors.blue.300'),
    outlineWidth: '0.125rem',
    outlineOffset: '0',
    text: token('colors.black'),
  },
  AA: {
    background: token('colors.blue.50'),
    outline: token('colors.blue.700'),
    outlineWidth: '0.1875rem',
    outlineOffset: '0.125rem',
    text: token('colors.gray.900'),
  },
  AAA: {
    background: token('colors.yellow.200'),
    outline: token('colors.black'),
    outlineWidth: '0.25rem',
    outlineOffset: '0.125rem',
    text: token('colors.black'),
  },
}

export const dangerFocusStyles: Record<WCAGLevel, FocusStyle> = {
  A: {
    background: 'transparent',
    outline: token('colors.red.300'),
    outlineWidth: '0.125rem',
    outlineOffset: '0',
    text: token('colors.black'),
  },
  AA: {
    background: token('colors.red.50'),
    outline: token('colors.red.700'),
    outlineWidth: '0.1875rem',
    outlineOffset: '0.125rem',
    text: token('colors.gray.900'),
  },
  AAA: {
    background: token('colors.yellow.200'),
    outline: token('colors.black'),
    outlineWidth: '0.25rem',
    outlineOffset: '0.125rem',
    text: token('colors.black'),
  },
}

type ButtonColorConfig = {
  primary: { bg: string; text: string; border: string }
  secondary: { bg: string; text: string; border: string }
  danger: { bg: string; text: string; border: string }
}

export const buttonColors: Record<WCAGLevel, ButtonColorConfig> = {
  A: {
    primary: {
      bg: token('colors.blue.400'),
      text: token('colors.white'),
      border: token('colors.blue.400'),
    },
    secondary: {
      bg: token('colors.gray.200'),
      text: token('colors.gray.700'),
      border: token('colors.gray.300'),
    },
    danger: {
      bg: token('colors.red.400'),
      text: token('colors.white'),
      border: token('colors.red.400'),
    },
  },
  AA: {
    primary: {
      bg: token('colors.blue.500'),
      text: token('colors.white'),
      border: token('colors.blue.500'),
    },
    secondary: {
      bg: token('colors.gray.100'),
      text: token('colors.gray.900'),
      border: token('colors.gray.400'),
    },
    danger: {
      bg: token('colors.red.600'),
      text: token('colors.white'),
      border: token('colors.red.600'),
    },
  },
  AAA: {
    primary: {
      bg: token('colors.blue.700'),
      text: token('colors.white'),
      border: token('colors.blue.800'),
    },
    secondary: {
      bg: token('colors.white'),
      text: token('colors.gray.900'),
      border: token('colors.gray.600'),
    },
    danger: {
      bg: token('colors.red.700'),
      text: token('colors.white'),
      border: token('colors.red.800'),
    },
  },
}

type BreadcrumbColorConfig = {
  text: string
  textCurrent: string
  link: string
  linkHover: string
  separator: string
  focusOutline: string
  focusBackground: string
}

export const breadcrumbsColors: Record<WCAGLevel, BreadcrumbColorConfig> = {
  A: {
    text: token('colors.gray.500'),
    textCurrent: token('colors.gray.700'),
    link: token('colors.blue.500'),
    linkHover: token('colors.blue.600'),
    separator: token('colors.gray.400'),
    focusOutline: token('colors.blue.300'),
    focusBackground: token('colors.blue.50'),
  },
  AA: {
    text: token('colors.gray.600'),
    textCurrent: token('colors.gray.900'),
    link: token('colors.blue.700'),
    linkHover: token('colors.blue.800'),
    separator: token('colors.gray.400'),
    focusOutline: token('colors.blue.500'),
    focusBackground: token('colors.blue.50'),
  },
  AAA: {
    text: token('colors.gray.700'),
    textCurrent: token('colors.gray.900'),
    link: token('colors.blue.800'),
    linkHover: token('colors.blue.900'),
    separator: token('colors.gray.500'),
    focusOutline: token('colors.black'),
    focusBackground: token('colors.yellow.200'),
  },
}

type TextColorConfig = {
  primary: string
  secondary: string
  link: string
}

export const textColors: Record<WCAGLevel, TextColorConfig> = {
  A: {
    primary: token('colors.gray.600'),
    secondary: token('colors.gray.500'),
    link: token('colors.blue.400'),
  },
  AA: {
    primary: token('colors.gray.900'),
    secondary: token('colors.gray.700'),
    link: token('colors.blue.700'),
  },
  AAA: {
    primary: token('colors.black'),
    secondary: token('colors.gray.800'),
    link: token('colors.blue.800'),
  },
}

type SizeRequirement = {
  minFontSize: string
  minFontSizeBold: string
  description: string
}

export const sizeRequirements: Record<WCAGLevel, SizeRequirement> = {
  A: {
    minFontSize: '1.5rem',
    minFontSizeBold: '1.15625rem',
    description: '大きいテキスト（18pt/1.5rem以上、または14pt/1.15625rem太字以上）のみ使用可能',
  },
  AA: {
    minFontSize: '1rem',
    minFontSizeBold: '0.875rem',
    description: '通常サイズのテキストから使用可能',
  },
  AAA: {
    minFontSize: '0.75rem',
    minFontSizeBold: '0.75rem',
    description: 'すべてのサイズで最高の可読性を提供',
  },
}

type LevelUseCase = {
  title: string
  description: string
  useCases: string[]
  warnings: string[]
  benefits: string[]
}

export const useCases: Record<WCAGLevel, LevelUseCase> = {
  A: {
    title: 'レベルA（最低限）',
    description: '法的義務の最低ライン',
    useCases: [
      '大きなテキストのみの簡易ページ',
      'プロトタイプやMVP',
      '一時的なランディングページ',
    ],
    warnings: [
      '⚠️ 視覚障害者には使いにくい可能性',
      '⚠️ 低コントラストの環境では見えにくい',
    ],
    benefits: [
      '✅ 実装コストが最も低い',
      '✅ PoCや短期施策で素早く公開できる',
    ],
  },
  AA: {
    title: 'レベルAA（推奨）★',
    description: 'ほとんどのWebサイトで推奨される標準',
    useCases: [
      'コーポレートサイト',
      'ECサイト',
      'ブログ・メディア',
      '一般的なWebアプリケーション',
    ],
    benefits: [
      '✅ 法的要件を満たす',
      '✅ ほとんどのユーザーに使いやすい',
      '✅ バランスの取れたデザイン',
    ],
    warnings: [
      '⚠️ コンポーネントによっては追加コストが発生',
      '⚠️ デザイン検証の工数が必要',
    ],
  },
  AAA: {
    title: 'レベルAAA（最高）',
    description: '最高レベルのアクセシビリティ',
    useCases: [
      '公共機関のWebサイト',
      '医療・福祉サービス',
      '金融機関',
      '教育機関',
      '高齢者向けサービス',
    ],
    benefits: [
      '✅ すべてのユーザーに優しい',
      '✅ 視覚障害者も快適に使用可能',
      '✅ ブランド信頼性の向上',
    ],
    warnings: [
      '⚠️ 実装・検証コストが高い',
      '⚠️ コンテンツ次第で達成が難しい場合がある',
    ],
  },
}

export const contrastDemos = {
  ratio3to1: {
    text: token('colors.gray.500'),
    background: token('colors.white'),
    actualRatio: '3.26:1',
    label: '見にくい',
  },
  ratio4_5to1: {
    text: token('colors.gray.600'),
    background: token('colors.white'),
    actualRatio: '4.55:1',
    label: 'ギリギリ読める',
  },
  ratio7to1: {
    text: token('colors.gray.800'),
    background: token('colors.white'),
    actualRatio: '11.6:1',
    label: '非常に読みやすい',
  },
} as const

export const accessibilityLevels = {
  focus: focusStyles,
  dangerFocus: dangerFocusStyles,
  button: buttonColors,
  breadcrumbs: breadcrumbsColors,
  text: textColors,
  size: sizeRequirements,
  useCases,
  contrastDemos,
} as const

export const focus = {
  ring: token('colors.blue.500'),
  background: token('colors.yellow.200'),
  outline: token('colors.black'),
  text: token('colors.black'),
} as const
