import { useEffect, useState } from "react";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockGoItemInput,
  CreateTermoblockProItemInput,
  CreateTermoblockUpItemInput,
} from "../types";
import FieldDetail from "./FieldDetail";
import GoDownIcon from "./icons/GoDownIcon";

type PriceFooterProps = {
  termoblock:
    | CreateTermoblockUpItemInput
    | CreateTermoblockProItemInput
    | CreateTermoblockGoItemInput;
  isValid: boolean;
  visible: boolean;
};

function PriceFooter({ termoblock, isValid, visible }: PriceFooterProps) {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const [clicked, setClicked] = useState<boolean>(false);

  const checkNan = (value: number) => {
    if (isNaN(value)) {
      return 0;
    }
    return value;
  };

  useEffect(() => {
    if (clicked) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      setClicked(false);
    }
  }, [clicked]);

  return (
    <>
      {visible && (
        <div className="hidden md:block fixed bottom-0 rounded-t-lg left-1/2 -translate-x-1/2 w-full bg-white min-h-[36px] h-auto shadow shadow-mainOrange transition z-50">
          <div className="container mx-auto flex ">
            <div className="m-4 flex w-full flex-wrap justify-around">
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

              {termoblock.felc === undefined ||
              isNaN(termoblock.felc) ? null : (
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
                description={`${termoblock.color ? termoblock.color : "-"}`}
                line={true}
                descriptionHoleType={false}
                descriptionPosition={false}
                descriptionDiameter={false}
              />
              <FieldDetail
                label="Zawias"
                description={`${termoblock.hinges ? termoblock.hinges : "-"}`}
                line={true}
                descriptionHoleType={false}
                descriptionPosition={false}
                descriptionDiameter={false}
              />
              {termoblock.firstHole ? (
                <FieldDetail
                  label="Rodzaj pierwszego otworu"
                  description={termoblock.firstHole.holeType}
                  descriptionHoleType={false}
                  descriptionPosition={false}
                  descriptionDiameter={false}
                  line={true}
                />
              ) : null}

              {termoblock.secondHole ? (
                <FieldDetail
                  label="Rodzaj drugiego otworu"
                  description={termoblock.secondHole.holeType}
                  descriptionHoleType={false}
                  descriptionPosition={false}
                  descriptionDiameter={false}
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

            {isValid && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  bg-mainOrange text-white rounded-t-lg">
                <button
                  onClick={() => setClicked(true)}
                  className="animation-bounce"
                >
                  <GoDownIcon></GoDownIcon>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PriceFooter;
