import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockGoItemInput,
  CreateTermoblockProItemInput,
  CreateTermoblockUpItemInput,
  StringParam,
} from "../types";
import termoblockToStringParams from "../utils/termoblockToStringParams";

type SummaryDetailsProps = {
  termoblock:
    | CreateTermoblockUpItemInput
    | CreateTermoblockProItemInput
    | CreateTermoblockGoItemInput;
};

function SummaryDetails({ termoblock }: SummaryDetailsProps) {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  let stringParams: StringParam[] = [];
  if (termoblock) {
    stringParams = termoblockToStringParams(termoblock);
  }

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
          {stringParams.map((stringParam) => {
            return (
              <div key={stringParam.label}>
                <div className="justify-between m-4 text-center flex-col">
                  <p>{stringParam.label}</p>
                  <p className="text-mainOrange text-lg font-bold">
                    {stringParam.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <hr className="w-64 h-1 mx-auto my-4 bg-mainOrange border-0 rounded md:my-10 dark:bg-gray-700" />
      </div>
    </section>
  );
}

export default SummaryDetails;
