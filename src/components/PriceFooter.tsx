import React, { useEffect, useState } from "react";
import useShoppingCart from "../hooks/useShoppingCart";
import { CreateTermoblockItemInput } from "../schema/termoblockItem.schema";
import { plColors } from "../schema/color.schema";
import { plHinges } from "../schema/hinge.schema";
import FieldDetail from "./FieldDetail";

type PriceFooterProps = {
  termoblock: CreateTermoblockItemInput;
  isValid: boolean;
  visible: boolean;
};

function PriceFooter(props: PriceFooterProps) {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const [termoblock, setTermoblock] = useState(props.termoblock);
  const [clicked, setClicked] = useState<boolean>(false);
  const isValid = props.isValid;
  const visible = props.visible;

  console.log(visible);

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

  useEffect(() => {
    setTermoblock(props.termoblock);
  }, [props.termoblock]);

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-5 m-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                    />
                  </svg>
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
