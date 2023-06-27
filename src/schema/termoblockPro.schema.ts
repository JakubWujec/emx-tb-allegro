import z from "zod";
import {
  HoleZodObject,
  stringPositions,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import { ColorEnum } from "./color.schema";
import HeightSchema from "./height.schema";
import WidthSchema from "./width.schema";
import FelcSchema from "./felc.schema";

export const TB_PRO_MIN_WIDTH = 250;
export const TB_PRO_MAX_WIDTH = 1400;
export const TB_PRO_MIN_HEIGHT = 250;
export const TB_PRO_MAX_HEIGHT = 2200;

export const termoblockProItemZodObject = z
  .object({
    width: WidthSchema(TB_PRO_MIN_WIDTH, TB_PRO_MAX_WIDTH),
    height: HeightSchema(TB_PRO_MIN_HEIGHT, TB_PRO_MAX_HEIGHT),
    color: ColorEnum,
    felc: FelcSchema(),
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
    hasThirdHole: z.boolean(),
    thirdHole: HoleZodObject.optional(),
    hasPowerCordHole: z.boolean(),
    powerCordHole: z
      .object({
        stringPosition: z.enum(stringPositions),
      })
      .optional(),
  })
  .transform((termoblock) => ({
    ...termoblock,
    name: "Termoblock Pro",
  }));

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
