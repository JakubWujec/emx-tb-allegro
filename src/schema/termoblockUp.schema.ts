import z from "zod";
import {
  HoleZodObject,
  termoblockHoleValidation,
} from "./termoblockHole.schema";

export const termoblockUpItemZodObject = z.object({
  termoblockType: z.literal("UP"),
  width: z.number().min(250).max(1100),
  height: z.number().min(250).max(1600),
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
});

export const createTermoblockUpItemSchema = termoblockUpItemZodObject.refine(
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

export type CreateTermoblockUpItemInput = z.TypeOf<
  typeof createTermoblockUpItemSchema
>;
