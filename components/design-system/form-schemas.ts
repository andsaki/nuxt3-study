import { z } from 'zod'

export const formSchemas = {
  email: z.string().email('有効なメールアドレスを入力してください'),
  required: (fieldName: string) => z.string().min(1, `${fieldName}は必須です`),
  minLength: (min: number, fieldName: string) =>
    z.string().min(min, `${fieldName}は${min}文字以上で入力してください`),
  maxLength: (max: number, fieldName: string) =>
    z.string().max(max, `${fieldName}は${max}文字以内で入力してください`),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Z]/, 'パスワードには大文字を含めてください')
    .regex(/[a-z]/, 'パスワードには小文字を含めてください')
    .regex(/[0-9]/, 'パスワードには数字を含めてください'),
  urlString: z.string().url('有効なURLを入力してください'),
  phone: z
    .string()
    .regex(/^[0-9-]+$/, '電話番号は数字とハイフンのみで入力してください'),
} as const
