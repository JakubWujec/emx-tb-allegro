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
  "dla Warmtec Controlbox",
  "okrągły na rurę bez uchwytu",
  "własna końcówka wysłana do zmierzenia",
] as const;

const HoleZodObject = z.object({
  stringPosition: z.enum(stringPositions),
  holeType: z.enum(holeTypes),
  diameter: z.number().optional(),
});

const diameterValidation = (diameter: number | undefined) =>
  diameter && diameter >= 50 && diameter <= 250;

export const termoblockItemZodObject = z.object({
  width: z.number().min(250).max(1200),
  height: z.number().min(250).max(2500),
  felc: z.number().min(5).max(50).optional(),
  color: ColorEnum,
  hinges: HingeEnum,
  firstHole: HoleZodObject.refine(
    (data) => {
      if (data.holeType === "okrągły na rurę bez uchwytu") {
        return diameterValidation(data.diameter);
      }
      return true;
    },
    {
      message: "Średnica otworu powinna być conajmniej 50 oraz conajwyżej 250",
      path: ["diameter"],
    }
  ),
  hasSecondHole: z.boolean(),
  secondHole: HoleZodObject.optional(),
  hasPowerCordHole: z.boolean(),
  powerCordHole: z
    .object({
      stringPosition: z.enum(stringPositions),
    })
    .optional(),
});

export const createTermoblockItemSchema = termoblockItemZodObject.refine(
  (data) => {
    if (data.hasSecondHole && data.secondHole) {
      if (data.secondHole.holeType === "okrągły na rurę bez uchwytu") {
        return diameterValidation(data.secondHole.diameter);
      }
    }
    return true;
  },
  {
    message: "Średnica otworu powinna być conajmniej 50 oraz conajwyżej 250",
    path: ["secondHole", "diameter"],
  }
);

export type CreateTermoblockItemInput = z.TypeOf<
  typeof createTermoblockItemSchema
>;
