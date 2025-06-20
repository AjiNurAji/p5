import { z } from 'zod'

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('member'),
])

const userSchema = z.object({
  id_number: z.number(),
  name: z.string(),
  email: z.nullable(z.string()),
  role: userRoleSchema,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  email_verified_at: z.nullable(z.coerce.date()),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
