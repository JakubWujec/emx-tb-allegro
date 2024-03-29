import { StringParam, TermoblockHole, TermoblockItem } from "../types";

const termoblockToStringParams = (
  termoblock: TermoblockItem
): StringParam[] => {
  const result: StringParam[] = [];

  result.push({
    label: "Szerokość",
    value: `${isNaN(termoblock.width) ? "" : termoblock.width} (mm)`,
  });

  result.push({
    label: "Wysokość",
    value: `${isNaN(termoblock.height) ? "" : termoblock.height} (mm)`,
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
      value: `${isNaN(termoblock.felc) ? "" : termoblock.felc} (mm)`,
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

  if (
    "secondHole" in termoblock &&
    termoblock.hasSecondHole &&
    termoblock.secondHole
  ) {
    result.push({
      label: "Drugi otwór",
      value: holeStringParamValue(termoblock.secondHole),
    });
  }

  if (
    "thirdHole" in termoblock &&
    "hasThirdHole" in termoblock &&
    termoblock.hasThirdHole &&
    termoblock.thirdHole
  ) {
    result.push({
      label: "Trzeci otwór",
      value: holeStringParamValue(termoblock.thirdHole),
    });
  }

  if ("powerCordHole" in termoblock && termoblock.hasPowerCordHole) {
    result.push({
      label: "Otwór na przewód zasilający",
      value: `${termoblock.powerCordHole?.stringPosition}`,
    });
  }

  return result;
};

function holeStringParamValue(hole: TermoblockHole) {
  if (!hole) return "";
  let result = `${hole.holeType}`;
  if (hole.stringPosition) {
    result = result.concat(`, ${hole.stringPosition}`);
  }
  if (hole.diameter) {
    result = result.concat(`, ${hole.diameter} (mm)`);
  }
  return result;
}

export default termoblockToStringParams;
