import { z } from "zod";

export const colors = ["Biały", "Brązowy", "Antracyt"] as const;
export const ColorEnum = z.enum(colors);
