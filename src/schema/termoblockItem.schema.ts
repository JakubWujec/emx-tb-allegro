import z from "zod";
import {
  HoleZodObject,
  stringPositions,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import { ColorEnum } from "./color.schema";
import { HingeEnum } from "./hinge.schema";

export const termoblockItemZodObject = z.object({
  width: z.number().min(250).max(1200),
  height: z.number().min(250).max(2500),
  felc: z.number().min(5).max(50).optional(),
  color: ColorEnum,
  hinges: HingeEnum,
  firstHole: HoleZodObject.refine(
    (data) => {
      return termoblockHoleValidation(data);
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
      return termoblockHoleValidation(data.secondHole);
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
