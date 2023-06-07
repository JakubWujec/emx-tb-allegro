import { plColors } from "../schema/color.schema";
import { plHinges } from "../schema/hinge.schema";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockGoItemInput,
  CreateTermoblockProItemInput,
  CreateTermoblockUpItemInput,
} from "../types";
import FieldDetail from "./FieldDetail";

type SummaryProps = {
  termoblock:
    | CreateTermoblockUpItemInput
    | CreateTermoblockProItemInput
    | CreateTermoblockGoItemInput;
};

function Summary({ termoblock }: SummaryProps) {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const checkNan = (value: number) => {
    if (isNaN(value)) {
      return 0;
    }
    return value;
  };

  return (
    <section className="container mx-auto min-h-[40vh] mt-12">
      <hr className="w-64 h-1 mx-auto my-4 bg-mainOrange border-0 rounded md:my-10 dark:bg-gray-700" />
      <h1 className="text-2xl font-bold text-mainOrange py-2 my-6 text-center">
        Podsumowanie
      </h1>
      <div className="flex flex-col">
        <div className="flex justify-around flex-wrap w-full">
          <FieldDetail
            label="Rozmiar"
            description={`A: ${checkNan(termoblock.width)}mm, B: ${checkNan(
              termoblock.height
            )}mm`}
            line={true}
            descriptionHoleType={false}
            descriptionPosition={false}
            descriptionDiameter={false}
          />
          {termoblock.felc === undefined || isNaN(termoblock.felc) ? null : (
            <FieldDetail
              label="Felc"
              description={`${termoblock.felc}mm`}
              line={true}
              descriptionHoleType={false}
              descriptionPosition={false}
              descriptionDiameter={false}
            />
          )}
          <FieldDetail
            label="Kolor"
            description={`${
              termoblock.color ? plColors[termoblock.color] : "-"
            }`}
            line={true}
            descriptionHoleType={false}
            descriptionPosition={false}
            descriptionDiameter={false}
          />
          <FieldDetail
            label="Zawias"
            description={`${
              termoblock.hinges ? plHinges[termoblock.hinges] : "-"
            }`}
            line={true}
            descriptionHoleType={false}
            descriptionPosition={false}
            descriptionDiameter={false}
          />
          {termoblock.firstHole ? (
            <FieldDetail
              label="Rodzaj pierwszego otworu"
              description={false}
              descriptionHoleType={termoblock.firstHole.holeType}
              descriptionPosition={termoblock.firstHole.stringPosition}
              descriptionDiameter={
                termoblock.firstHole.diameter !== undefined
                  ? `${checkNan(termoblock.firstHole.diameter)}mm`
                  : false
              }
              line={true}
            />
          ) : null}
          {termoblock?.hasSecondHole && termoblock.secondHole ? (
            <FieldDetail
              label="Rodzaj drugiego otworu"
              description={false}
              descriptionHoleType={termoblock.secondHole.holeType}
              descriptionPosition={termoblock.secondHole.stringPosition}
              descriptionDiameter={
                termoblock.secondHole.diameter !== undefined
                  ? `${checkNan(termoblock.secondHole.diameter)}mm`
                  : false
              }
              line={true}
            />
          ) : null}
          {termoblock.hasPowerCordHole && termoblock.powerCordHole ? (
            <FieldDetail
              label="Otwór na przewód zasilający"
              description={termoblock.powerCordHole.stringPosition}
              descriptionHoleType={false}
              descriptionPosition={false}
              descriptionDiameter={false}
              line={true}
            />
          ) : null}
        </div>
        <hr className="w-64 h-1 mx-auto my-4 bg-mainOrange border-0 rounded md:my-10 dark:bg-gray-700" />
      </div>
    </section>
  );
}

export default Summary;
