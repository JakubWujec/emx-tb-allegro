import { z } from "zod";

export const hinges = ["Brak", "Po lewej", "Po prawej"] as const;
export const HingeEnum = z.enum(hinges);
