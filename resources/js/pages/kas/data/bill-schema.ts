import { z } from "zod";

const billSchema = z.object({
  name: z.string(),
  date_of_bill: z.coerce.date(),
});

export type Bill = z.infer<typeof billSchema>;

export const billListSchema = z.array(billSchema);