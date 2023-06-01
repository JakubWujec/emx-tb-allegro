import z from "zod";
import { HoleZodObject } from "./termoblockHole.schema";

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

const diameterValidation = (diameter: number | undefined) =>
  diameter && diameter >= 50 && diameter <= 250;

export const termoblockUpItemZodObject = z.object({
  width: z.number().min(250).max(1100),
  height: z.number().min(250).max(1600),
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
});

export const createTermoblockItemSchema = termoblockUpItemZodObject.refine(
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

export type CreateTermoblockUpItemInput = z.TypeOf<
  typeof createTermoblockItemSchema
>;
