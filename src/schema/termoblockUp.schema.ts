import z from "zod";
import {
  HoleZodObject,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import WidthSchema from "./width.schema";
import HeightSchema from "./height.schema";

export const TB_UP_MIN_WIDTH = 250;
export const TB_UP_MAX_WIDTH = 1100;
export const TB_UP_MIN_HEIGHT = 250;
export const TB_UP_MAX_HEIGHT = 1600;

export const termoblockUpItemZodObject = z
  .object({
    width: WidthSchema(TB_UP_MIN_WIDTH, TB_UP_MAX_WIDTH),
    height: HeightSchema(TB_UP_MIN_HEIGHT, TB_UP_MAX_HEIGHT),
    firstHole: HoleZodObject.refine(
      (data) => {
        return termoblockHoleValidation(data);
      },
      {
        message:
          "Średnica otworu powinna być conajmniej 80 oraz conajwyżej 250",
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
    message: "Średnica otworu powinna być conajmniej 80 oraz conajwyżej 250",
    path: ["secondHole", "diameter"],
  }
);
export type CreateTermoblockUpItemInput = z.TypeOf<
  typeof createTermoblockUpItemSchema
>;
