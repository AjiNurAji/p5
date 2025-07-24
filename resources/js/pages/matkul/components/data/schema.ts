import { z } from "zod";

const SemesterObject = z.object({
  semester: z.any(),
});

const matkulSchema = z.object({
  id_matkul: z.string(),
  name: z.string(),
  lecturer: z.string(),
  id_semester: z.string(),
  semester: SemesterObject,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Matkul = z.infer<typeof matkulSchema>;

export const matkulListSchema = z.array(matkulSchema);
