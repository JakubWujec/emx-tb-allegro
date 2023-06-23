import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import SubmitWithPricing from "../components/SubmitWithPricing";
import SummaryDetails from "../components/SummaryDetails";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

import ColorsFields from "../components/formFields/ColorFields";
import FelcField from "../components/formFields/FelcField";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import PowerCordHoleFields from "../components/formFields/PowerCordHoleFields";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import ThirdHoleFields from "../components/formFields/ThirdHoleFields";
import WidthAndHeightFields from "../components/formFields/WidthAndHeightFields";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";
import {
  CreateTermoblockProItemInput,
  createTermoblockProItemSchema,
} from "../schema/termoblockPro.schema";
import calculatePrice from "../utils/calculatePrice";
import { TitleHeader } from "../components/TitleHeader";

const ConfiguratorPro = () => {
  const { addItem } = useContext(ShoppingCartContext);
  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {});
  const visible = !entry?.isIntersecting;

  const formMethods = useForm<CreateTermoblockProItemInput>({
    resolver:
      createTermoblockProItemSchema &&
      zodResolver(createTermoblockProItemSchema),
    mode: "onBlur",
    shouldUnregister: true,
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0 &&
    createTermoblockProItemSchema.safeParse(termoblock).success;
  const price = calculatePrice({ ...termoblock, name: "Termoblock Pro" });

  function onSubmit(values: CreateTermoblockProItemInput) {
    addItem({
      id: 2,
      name: values.name ?? "Termoblock Pro",
      productTypeId: 1,
      price: price,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TitleHeader title="Termoblock Pro"></TitleHeader>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <ColorsFields></ColorsFields>
          <WidthAndHeightFields />
          <FelcField></FelcField>
          <FirstHoleFields></FirstHoleFields>
          <SecondHoleFields></SecondHoleFields>
          <ThirdHoleFields></ThirdHoleFields>
          <PowerCordHoleFields />
          <div ref={summaryRef} className="flex ">
            <div className={"basis-3/4"}>
              <SummaryDetails termoblock={termoblock} />
            </div>
            <div className="basis-1/4 m-4 w-full text-center justify-center flex">
              <SubmitWithPricing
                price={price}
                disabled={!termoblockIsValid}
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
