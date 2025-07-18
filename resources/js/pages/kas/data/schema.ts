import { z } from "zod";

const User = z.object({
  name: z.string(),
});

const kasSchema = z.object({
  id_kas: z.string(),
  id_number: z.string(),
  user: User,
  payment_on: z.coerce.date(),
  nominal: z.number(),
  method: z.string()
});

export type Kas = z.infer<typeof kasSchema>;

export const kasListSchema = z.array(kasSchema);