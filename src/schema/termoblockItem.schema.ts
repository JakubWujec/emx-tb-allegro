import z from "zod";
import {
  HoleZodObject,
  stringPositions,
  termoblockHoleValidation,
} from "./termoblockHole.schema";
import { ColorEnum } from "./color.schema";
import { HingeEnum } from "./hinge.schema";

export const termoblockItemZodObject = z.object({
  width: z
    .number({
      required_error: "Szerokość jest wymagana",
      invalid_type_error: "Szerokość musi być liczbą",
    })
    .min(250, "Szerokość musi wynosić przynajmniej 250mm")
    .max(1200, "Szerokość nie może wynosić więcej niż 1200mm"),
  height: z
    .number({
      required_error: "Wysokość jest wymagana",
      invalid_type_error: "Wysokość musi być liczbą",
    })
    .min(250, "Wysokość musi wynosić przynajmniej 250mm")
    .max(2500, "Wysokość nie może wynosić więcej niż 2500mm"),
  felc: z
    .number({
      required_error: "Rozmiar felcu jest wymagany",
      invalid_type_error: "Rozmiar felcu musi być liczbą",
    })
    .min(5, "Felc musi mieć przynajmniej 5mm")
    .max(50, "Felc nie może mieć więcej niż 50mm")
    .optional(),
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
