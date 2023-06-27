import z from "zod";
import {
  HoleZodObject,
  stringPositions,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import { ColorEnum } from "./color.schema";
import { HingeEnum } from "./hinge.schema";
import WidthSchema from "./width.schema";
import HeightSchema from "./height.schema";

export const TB_GO_MIN_WIDTH = 250;
export const TB_GO_MAX_WIDTH = 1200;
export const TB_GO_MIN_HEIGHT = 250;
export const TB_GO_MAX_HEIGHT = 2500;

export const termoblockGoItemZodObject = z
  .object({
    width: WidthSchema(TB_GO_MIN_WIDTH, TB_GO_MAX_WIDTH),
    height: HeightSchema(TB_GO_MIN_HEIGHT, TB_GO_MAX_HEIGHT),
    color: ColorEnum,
    hinges: HingeEnum,
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
    hasPowerCordHole: z.boolean(),
    powerCordHole: z
      .object({
        stringPosition: z.enum(stringPositions),
      })
      .optional(),
  })
  .transform((termoblock) => ({
    ...termoblock,
    name: "Termoblock Go",
  }));

export const createTermoblockGoItemSchema = termoblockGoItemZodObject.refine(
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

export type CreateTermoblockGoItemInput = z.TypeOf<
  typeof createTermoblockGoItemSchema
>;
