import { z } from "zod";

function FelcSchema() {
  return z
    .number({
      required_error: "Rozmiar felcu jest wymagany",
      invalid_type_error: "Rozmiar felcu musi być liczbą",
    })
    .min(5, "Felc musi mieć przynajmniej 5mm")
    .max(50, "Felc nie może mieć więcej niż 50mm");
}

export default FelcSchema;
