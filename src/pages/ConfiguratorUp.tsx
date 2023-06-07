import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockUpItemInput,
  createTermoblockUpItemSchema,
} from "../schema/termoblockUp.schema";
import TermoblockUpForm from "../components/forms/TermoblockUpForm";
import { useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import PriceFooter from "../components/PriceFooter";
import Summary from "../components/Summary";
import calculatePrice from "../utils/calculatePrice";
import AddIcon from "../components/icons/AddIcon";

const ConfiguratorUp = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {});
  const visible = !entry?.isIntersecting;

  const formMethods = useForm<CreateTermoblockUpItemInput>({
    resolver:
      createTermoblockUpItemSchema && zodResolver(createTermoblockUpItemSchema),
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0;
  const price = calculatePrice(termoblock);

  function onSubmit(values: CreateTermoblockUpItemInput) {
    addItem({
      id: 3,
      name: values.name,
      price: price,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TermoblockUpForm formMethods={formMethods} onSubmit={onSubmit} />
      <PriceFooter
        isValid={termoblockIsValid}
        termoblock={termoblock}
        visible={visible}
      />

      <div ref={summaryRef} className="flex ">
        <div className={"basis-3/4"}>
          <Summary termoblock={termoblock} />
        </div>

        <div className="m-4 w-full text-center justify-center flex basis-1/4">
          {!termoblockIsValid ? (
            <div className="mt-6">
              <span className="border border-mainOrange block px-6 py-4">
                Wpisz w formularzu parametry, po wpisaniu pojawi się cena
                produktu
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full mt-6">
              <span className="text-4xl font-bold text-mainOrange">
                {price} ZŁ
              </span>

              <button
                type="submit"
                onClick={formMethods.handleSubmit(onSubmit)}
              >
                <AddIcon></AddIcon>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorUp;
