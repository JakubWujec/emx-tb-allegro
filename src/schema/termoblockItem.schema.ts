import z from "zod";

export const colors = ["white", "brown", "anthracit"] as const;
export const plColors = {
  white: "Biały",
  brown: "Brązowy",
  anthracit: "Antracyt",
};
export const ColorEnum = z.enum(colors);
export type TermoblockItemColorEnum = z.infer<typeof ColorEnum>;

export const createTermoblockItemSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  felc: z.number().positive(),
  color: ColorEnum,
});

export type CreateTermoblockItemInput = z.TypeOf<
  typeof createTermoblockItemSchema
>;
