import { z } from "zod";


const taskSchema = z.object({
  id_task: z.string(),
  task: z.string(),
  id_matkul: z.string(),
  deadline: z.coerce.date(),
});

export type Task = z.infer<typeof taskSchema>;

export const taskListSchema = z.array(taskSchema);