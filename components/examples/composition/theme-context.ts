import type { InjectionKey, Ref } from 'vue'

export type ThemeContext = {
  mode: Ref<'light' | 'dark'>
  accent: Ref<string>
  toggleMode: () => void
  setAccent: (hex: string) => void
}

export const themeContextKey: InjectionKey<ThemeContext> = Symbol('composition-demo-theme')
