import z from "zod";

export const holeTypes = [
  "dla Warmtec Controlbox",
  "okrągły na rurę bez uchwytu",
  "własna końcówka wysłana do zmierzenia",
] as const;

export const stringPositions = [
  "na dole po lewej",
  "na dole na środku",
  "na dole po prawej",
  "na środku po lewej",
  "na środku",
  "na środku po prawej",
  "na górze po lewej",
  "na górze na środku",
  "na górze po prawej",
] as const;

export const HoleZodObject = z.object({
  stringPosition: z.enum(stringPositions),
  holeType: z.enum(holeTypes),
  diameter: z.number().optional(),
});

export type TermoblockHole = z.TypeOf<typeof HoleZodObject>;

const diameterValidation = (diameter: number | undefined) =>
  diameter && diameter >= 50 && diameter <= 250;

export const termoblockHoleValidation = (termoblockHole: TermoblockHole) => {
  if (termoblockHole.holeType === "okrągły na rurę bez uchwytu") {
    return diameterValidation(termoblockHole.diameter);
  }

  return true;
};
