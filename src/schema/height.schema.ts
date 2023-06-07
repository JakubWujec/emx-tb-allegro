import { z } from "zod";

function HeightSchema(minWidth: number, maxWidth: number) {
  return z
    .number({
      required_error: "Wysokość jest wymagana",
      invalid_type_error: "Wysokość musi być liczbą",
    })
    .min(minWidth, `Wysokość musi wynosić przynajmniej ${minWidth} mm`)
    .max(maxWidth, `Wysokość nie może wynosić więcej niż ${maxWidth}mm`);
}

export default HeightSchema;
