import { plColors } from "../schema/color.schema";
import { plHinges } from "../schema/hinge.schema";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockGoItemInput,
  CreateTermoblockProItemInput,
  CreateTermoblockUpItemInput,
} from "../types";
import FieldDetail from "./FieldDetail";
import calculatePrice from "../utils/calculatePrice";

type SummaryProps = {
  termoblock:
    | CreateTermoblockUpItemInput
    | CreateTermoblockProItemInput
    | CreateTermoblockGoItemInput;
  isValid: boolean;
};

function Summary({ termoblock, isValid }: SummaryProps) {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const price = calculatePrice(termoblock);

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
        <div className="m-4 w-full text-center justify-center flex">
          {!isValid ? (
            <div className="mt-6">
              <span className="border border-mainOrange block px-6 py-4">
                Wpisz w formularzu parametry, po wpisaniu pojawi się cena
                produktu
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full mt-6">
              <p className="text-2xl">
                <span className="text-4xl font-bold text-mainOrange">
                  {price}
                </span>{" "}
                ZŁ
              </p>
              <button
                onClick={() =>
                  addItem({
                    id: 1,
                    name: "Termoblock",
                    price: price,
                    quantity: 1,
                    details: termoblock,
                  })
                }
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="m-4 border border-mainOrange rounded-full bg-mainOrange text-white w-8 animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Summary;
