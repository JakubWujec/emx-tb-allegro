import z from "zod";
import {
  HoleZodObject,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import WidthSchema from "./width.schema";
import HeightSchema from "./height.schema";

export const termoblockUpItemZodObject = z
  .object({
    width: WidthSchema(250, 1100),
    height: HeightSchema(250, 1600),
    firstHole: HoleZodObject.refine(
      (data) => {
        return termoblockHoleValidation(data);
      },
      {
        message:
          "Średnica otworu powinna być conajmniej 50 oraz conajwyżej 250",
        path: ["diameter"],
      }
    ),
    hasSecondHole: z.boolean(),
    secondHole: HoleZodObject.optional(),
  })
  .transform((termoblock) => ({
    ...termoblock,
    name: "Termoblock Up",
  }));

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
