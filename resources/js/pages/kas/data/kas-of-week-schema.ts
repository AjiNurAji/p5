import { z } from "zod";


const Kas = z.object({
  id_kas: z.string(),
  id_number: z.string(),
  nominal: z.any(),
});

const User = z.object({
  name: z.string(),
  kas: z.array(Kas),
  id_number: z.string(),
});

export type KasOfWeek = z.infer<typeof User>;

export const kasOfWeekListSchema = z.array(User);