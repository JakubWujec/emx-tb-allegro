import { zodResolver } from "@hookform/resolvers/zod";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import Summary from "../components/Summary";
import SummaryPricing from "../components/SummaryPricing";
import TermoblockUpForm from "../components/forms/TermoblockUpForm";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockUpItemInput,
  createTermoblockUpItemSchema,
} from "../schema/termoblockUp.schema";
import calculatePrice from "../utils/calculatePrice";

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
        <div className="basis-1/4 m-4 w-full text-center justify-center flex">
          <SummaryPricing
            price={price}
            termoblockIsValid={termoblockIsValid}
            onClickHandler={() => formMethods.handleSubmit(onSubmit)}
          ></SummaryPricing>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorUp;
