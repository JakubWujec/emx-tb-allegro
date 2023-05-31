import { CreateTermoblockItemInput } from "../schema/termoblockItem.schema";
//TODO obsługa trzeciego otworu

export default function calculatePrice(
  termoblockItem: CreateTermoblockItemInput
) {
  let result = 0;

  const areaInSquareMillimeters = termoblockItem.width * termoblockItem.height;
  const areaInSquareMeters = areaInSquareMillimeters / 1_000_000;

  result += priceForArea(areaInSquareMeters);
  result += priceForExtraHoles(termoblockItem);
  result += priceForUnfamiliarHoles(termoblockItem);

  return result;
}

function priceForUnfamiliarHoles(termoblockItem: CreateTermoblockItemInput) {
  let result = 0;
  let unfamiliarHolePrice = 50;
  if (
    termoblockItem.firstHole.holeType ===
    "własna końcówka wysłana do zmierzenia"
  )
    result += unfamiliarHolePrice;
  if (
    termoblockItem.secondHole &&
    termoblockItem.secondHole.holeType ===
      "własna końcówka wysłana do zmierzenia"
  )
    result += unfamiliarHolePrice;

  return result;
}

function priceForExtraHoles(termoblockItem: CreateTermoblockItemInput) {
  let result = 0;

  if (termoblockItem.hasSecondHole) result += 50;
  if (termoblockItem.hasPowerCordHole) result += 20;

  return result;
}

function priceForArea(areaInSquareMeters: number) {
  let price = 0;
  if (areaInSquareMeters > 0.5 && areaInSquareMeters <= 0.75) {
    price += 50.0;
  } else if (areaInSquareMeters <= 1) {
    price += 100.0;
  } else if (areaInSquareMeters <= 1.25) {
    price += 150.0;
  } else if (areaInSquareMeters <= 1.5) {
    price += 200.0;
  } else if (areaInSquareMeters <= 1.75) {
    price += 250.0;
  } else if (areaInSquareMeters <= 2) {
    price += 300.0;
  } else if (areaInSquareMeters <= 2.25) {
    price += 350.0;
  } else if (areaInSquareMeters <= 2.5) {
    price += 400.0;
  } else if (areaInSquareMeters <= 2.75) {
    price += 450.0;
  } else if (areaInSquareMeters <= 3) {
    price += 500.0;
  } else {
    price += 600.0;
  }
  return price;
}
