import { z } from "zod";

function WidthSchema(minWidth: number, maxWidth: number) {
  return z
    .number({
      required_error: "Szerokość jest wymagana",
      invalid_type_error: "Szerokość musi być liczbą",
    })
    .min(minWidth, `Szerokość musi wynosić przynajmniej ${minWidth} mm`)
    .max(maxWidth, `Szerokość nie może wynosić więcej niż ${maxWidth}mm`);
}

export default WidthSchema;
