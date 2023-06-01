import z from "zod";
import { HoleZodObject, stringPositions } from "./termoblockHole.schema";
import { ColorEnum } from "./color.schema";
import { HingeEnum } from "./hinge.schema";

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
