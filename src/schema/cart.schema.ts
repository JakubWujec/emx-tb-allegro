import { z } from "zod";

export const CartSchema = z.object({
  login: z.string().nonempty(),
});

export type CartFormInput = z.TypeOf<typeof CartSchema>;
