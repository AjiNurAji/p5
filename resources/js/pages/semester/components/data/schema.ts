import { z } from "zod";

const semesterSchema = z.object({
  id_semester: z.string(),
  semester: z.number(),
  is_active: z.boolean(),
});

export type SemesterType = z.infer<typeof semesterSchema>;

export const semesterListSchema = z.array(semesterSchema);