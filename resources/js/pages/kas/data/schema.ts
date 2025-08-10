import { z } from "zod";

const User = z.object({
  name: z.string(),
});

const kasSchema = z.object({
  id_kas: z.string(),
  id_number: z.string(),
  user: User,
  payment_on: z.coerce.date(),
  nominal: z.any(),
  method: z.string(),
  note: z.any(),
  type: z.any()
});

export type Kas = z.infer<typeof kasSchema>;

export const kasListSchema = z.array(kasSchema);