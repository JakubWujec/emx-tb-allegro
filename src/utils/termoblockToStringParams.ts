import { StringParam, TermoblockHole, TermoblockItem } from "../types";

const termoblockToStringParams = (
  termoblock: TermoblockItem
): StringParam[] => {
  const result: StringParam[] = [];

  result.push({
    label: "Nazwa",
    value: `${termoblock.name}`,
  });

  result.push({
    label: "Szerokość",
    value: `${termoblock.width} (mm)`,
  });

  result.push({
    label: "Wysokość",
    value: `${termoblock.height} (mm)`,
  });

  if ("color" in termoblock) {
    result.push({
      label: "Kolor",
      value: termoblock.color,
    });
  }

  if ("felc" in termoblock) {
    result.push({
      label: "Felc",
      value: termoblock.felc.toString(),
    });
  }

  if ("hinges" in termoblock) {
    result.push({
      label: "Zawiasy",
      value: termoblock.hinges,
    });
  }

  result.push({
    label: "Pierwszy otwór",
    value: holeStringParamValue(termoblock.firstHole),
  });

  if ("secondHole" in termoblock) {
    result.push({
      label: "Drugi otwór",
      value: holeStringParamValue(termoblock.secondHole),
    });
  }

  if ("thirdHole" in termoblock) {
    result.push({
      label: "Trzeci otwór",
      value: holeStringParamValue(termoblock.thirdHole),
    });
  }

  return result;
};

function holeStringParamValue(hole: TermoblockHole) {
  let result = `${hole.holeType}, ${hole.stringPosition}`;
  if (hole.diameter) {
    result = result.concat(`, ${hole.diameter}`);
  }
  return result;
}

export default termoblockToStringParams;
