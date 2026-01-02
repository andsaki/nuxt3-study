// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js', '**/*.mjs'],
    rules: {
      // TypeScript関連
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // Vue関連
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'off',
      'vue/no-unused-vars': 'warn',

      // 一般的なルール
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  // examplesディレクトリ用のルール緩和
  {
    files: ['pages/examples/**/*.vue'],
    rules: {
      'vue/one-component-per-file': 'off',
      'no-console': 'off',
    },
  },
  // prisma/seed.ts用のルール緩和
  {
    files: ['prisma/seed.ts'],
    rules: {
      'no-console': 'off',
    },
  }
)
