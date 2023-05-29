import z from "zod";

export const createTermoblockItemSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  felc: z.number().positive(),
});

export type CreateTermoblockItemInput = z.TypeOf<
  typeof createTermoblockItemSchema
>;
