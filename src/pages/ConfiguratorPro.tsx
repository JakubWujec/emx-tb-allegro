import { zodResolver } from "@hookform/resolvers/zod";

import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import SummaryDetails from "../components/SummaryDetails";
import SubmitWithPricing from "../components/SubmitWithPricing";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockProItemInput,
  createTermoblockProItemSchema,
} from "../schema/termoblockPro.schema";
import calculatePrice from "../utils/calculatePrice";
import ThirdHoleFields from "../components/formFields/ThirdHoleFields";
import ColorsFields from "../components/formFields/ColorFields";
import FelcField from "../components/formFields/FelcField";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import WidthAndHeightFields from "../components/formFields/WidthAndHeightFields";

const ConfiguratorPro = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {});
  const visible = !entry?.isIntersecting;

  const formMethods = useForm<CreateTermoblockProItemInput>({
    resolver:
      createTermoblockProItemSchema &&
      zodResolver(createTermoblockProItemSchema),
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0;
  const price = calculatePrice(termoblock);

  function onSubmit(values: CreateTermoblockProItemInput) {
    addItem({
      id: 2,
      name: values.name ?? "Termoblock PRO",
      productTypeId: 1,
      price: price,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <ColorsFields></ColorsFields>
          <WidthAndHeightFields />
          <FelcField></FelcField>
          <FirstHoleFields></FirstHoleFields>
          <SecondHoleFields></SecondHoleFields>
          <ThirdHoleFields></ThirdHoleFields>

          <div ref={summaryRef} className="flex ">
            <div className={"basis-3/4"}>
              <SummaryDetails termoblock={termoblock} />
            </div>
            <div className="basis-1/4 m-4 w-full text-center justify-center flex">
              <SubmitWithPricing
                price={price}
                disabled={termoblockIsValid}
              ></SubmitWithPricing>
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

export default ConfiguratorPro;
