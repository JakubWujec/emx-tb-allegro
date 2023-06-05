import z from "zod";
import {
  HoleZodObject,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import { ColorEnum } from "./color.schema";

export const termoblockProItemZodObject = z.object({
  width: z.number().min(250).max(1100),
  height: z.number().min(250).max(1600),
  color: ColorEnum,
  felc: z.number().min(5).max(50).optional(),
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
  hasThirdHole: z.boolean(),
  thirdHole: HoleZodObject.optional(),
});

export const createTermoblockProItemSchema = termoblockProItemZodObject.refine(
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

export type CreateTermoblockProItemInput = z.TypeOf<
  typeof createTermoblockProItemSchema
>;
