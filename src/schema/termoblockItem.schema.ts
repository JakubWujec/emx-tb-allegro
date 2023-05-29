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
export const HingeEnum = z.enum(hinges);

export const stringPositions = [
  "na dole po lewej",
  "na dole na środku",
  "na dole po prawej",
  "na środku po lewej",
  "na środku",
  "na środku po prawej",
  "na górze po lewej",
  "na górze na środku",
  "na górze po prawej",
] as const;

export const holeTypes = [
  "okrągły na rurę bez uchwytu",
  "własna końcówka wysłana do zmierzenia",
  "dla Warmtec Controlbox",
] as const;

export const createTermoblockItemSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  felc: z.number().positive(),
  color: ColorEnum,
  hinges: HingeEnum,
  firstHole: z
    .object({
      stringPosition: z.enum(stringPositions),
      holeType: z.enum(holeTypes),
      diameter: z.number().optional(),
    })
    .refine(
      (data) => {
        if (data.holeType === "okrągły na rurę bez uchwytu") {
          return data.diameter && data.diameter > 50;
        }
        console.log("AAA");
        return true;
      },
      {
        message: "Średnica otworu powinna być większa niż 50",
      }
    ),
});

export type CreateTermoblockItemInput = z.TypeOf<
  typeof createTermoblockItemSchema
>;
