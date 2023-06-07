import { StringParam, TermoblockItem } from "../types";

const termoblockToStringParams = (
  termoblock: TermoblockItem
): StringParam[] => {
  const result: StringParam[] = [];

  result.push({
    label: "Rozmiar",
    value: `${termoblock.width} x ${termoblock.height}`,
  });

  if ("color" in termoblock) {
    result.push({
      label: "Kolor",
      value: `${termoblock.color}`,
    });
  }

  if ("hinges" in termoblock) {
    result.push({
      label: "Zawiasy",
      value: `${termoblock.hinges}`,
    });
  }

  return result;
};
