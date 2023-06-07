import { zodResolver } from "@hookform/resolvers/zod";

import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import SummaryDetails from "../components/SummaryDetails";
import SummaryPricing from "../components/SummaryPricing";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import WidthAndHeightFields from "../components/formFields/WidthAndHeightFields";
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
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <WidthAndHeightFields></WidthAndHeightFields>
          <FirstHoleFields></FirstHoleFields>
          <SecondHoleFields></SecondHoleFields>
          <div ref={summaryRef} className="flex ">
            <div className={"basis-3/4"}>
              <SummaryDetails termoblock={termoblock} />
            </div>
            <div className="basis-1/4 m-4 w-full text-center justify-center flex">
              <SummaryPricing
                price={price}
                termoblockIsValid={termoblockIsValid}
              ></SummaryPricing>
            </div>
          </div>
        </form>
      </FormProvider>
      <PriceFooter
        isValid={termoblockIsValid}
        termoblock={termoblock}
        visible={visible}
      />
    </div>
  );
};

export default ConfiguratorUp;
