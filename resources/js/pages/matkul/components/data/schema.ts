import { z } from 'zod';

const matkulSchema = z.object({
  id_matkul: z.string(),
  name: z.string(),
  lecturer: z.string(),
  semester: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Matkul = z.infer<typeof matkulSchema>;

export const matkulListSchema = z.array(matkulSchema);