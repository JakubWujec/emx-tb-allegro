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

export const termoblockGoItemZodObject = z
  .object({
    width: WidthSchema(250, 1200),
    height: HeightSchema(250, 2500),
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

export const createTermoblockGoItemSchema = termoblockGoItemZodObject
  .refine(
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
  )
  .superRefine(({ firstHole, secondHole }, ctx) => {
    if (secondHole) {
      if (firstHole.stringPosition === secondHole.stringPosition) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Otwory muszą mieć różne położenia.`,
          path: ["secondHole", "stringPosition"],
        });
      }
    }
  });

export type CreateTermoblockGoItemInput = z.TypeOf<
  typeof createTermoblockGoItemSchema
>;
