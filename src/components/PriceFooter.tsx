import { StringParam } from "../types";
import GoDownIcon from "./icons/GoDownIcon";

type PriceFooterProps = {
  stringParams: StringParam[];
  isValid: boolean;
  visible: boolean;
};

function PriceFooter({ stringParams, visible }: PriceFooterProps) {
  const handleClick = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <div className="hidden md:block fixed bottom-0 rounded-t-lg left-1/2 -translate-x-1/2 w-full bg-white min-h-[36px] h-auto shadow shadow-mainOrange transition z-50">
          <div className="container mx-auto flex ">
            <div className="m-4 flex w-full flex-wrap justify-around">
              {stringParams.map((stringParam) => (
                <div
                  key={stringParam.label}
                  className="justify-between m-4 text-center flex-col"
                >
                  <p>{stringParam.label}</p>
                  <p className="text-mainOrange text-lg font-bold">
                    {stringParam.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  bg-mainOrange text-white rounded-t-lg">
              <button onClick={handleClick} className="animation-bounce">
                <GoDownIcon></GoDownIcon>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PriceFooter;
