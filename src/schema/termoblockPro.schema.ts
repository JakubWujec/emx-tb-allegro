import z from "zod";
import {
  HoleZodObject,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import { ColorEnum } from "./color.schema";
import HeightSchema from "./height.schema";
import WidthSchema from "./width.schema";
import FelcSchema from "./felc.schema";

export const termoblockProItemZodObject = z
  .object({
    width: WidthSchema(250, 1400),
    height: HeightSchema(250, 2200),
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
