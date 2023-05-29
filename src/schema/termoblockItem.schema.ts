import z from "zod";

export const colors = ["white", "brown", "anthracit"] as const;
export const plColors = {
  white: "Biały",
  brown: "Brązowy",
  anthracit: "Antracyt",
};
export const ColorEnum = z.enum(colors);

export const hinges = ["none", "left", "right"] as const;
export const plHinges = {
  none: "Brak",
  left: "Po lewej",
  right: "Po prawej",
};
export const HingeEnum = z.enum(colors);

export const createTermoblockItemSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  felc: z.number().positive(),
  color: ColorEnum,
  hinges: HingeEnum,
});

export type CreateTermoblockItemInput = z.TypeOf<
  typeof createTermoblockItemSchema
>;
