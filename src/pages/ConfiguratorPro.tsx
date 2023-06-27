import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import SubmitWithPricing from "../components/SubmitWithPricing";
import SummaryDetails from "../components/SummaryDetails";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

import { MinMaxDescription } from "../components/MinMaxDescription";
import { TitleHeader } from "../components/TitleHeader";
import ColorsFields from "../components/formFields/ColorFields";
import FelcField from "../components/formFields/FelcField";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import HeightField from "../components/formFields/HeightField";
import PowerCordHoleFields from "../components/formFields/PowerCordHoleFields";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import ThirdHoleFields from "../components/formFields/ThirdHoleFields";
import WidthField from "../components/formFields/WidthField";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";
import {
  CreateTermoblockProItemInput,
  TB_PRO_MAX_HEIGHT,
  TB_PRO_MAX_WIDTH,
  TB_PRO_MIN_HEIGHT,
  TB_PRO_MIN_WIDTH,
  createTermoblockProItemSchema,
} from "../schema/termoblockPro.schema";
import calculatePrice from "../utils/calculatePrice";
import termoblockToStringParams from "../utils/termoblockToStringParams";

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
  const stringParams = termoblockToStringParams(termoblock);

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
          <WidthField></WidthField>
          <MinMaxDescription
            minValue={TB_PRO_MIN_WIDTH}
            maxValue={TB_PRO_MAX_WIDTH}
          ></MinMaxDescription>
          <HeightField></HeightField>
          <MinMaxDescription
            minValue={TB_PRO_MIN_HEIGHT}
            maxValue={TB_PRO_MAX_HEIGHT}
          ></MinMaxDescription>
          <ColorsFields></ColorsFields>
          <FelcField></FelcField>
          <MinMaxDescription minValue={5} maxValue={50}></MinMaxDescription>
          <FirstHoleFields></FirstHoleFields>
          <SecondHoleFields></SecondHoleFields>
          <ThirdHoleFields></ThirdHoleFields>
          <PowerCordHoleFields />
          <div ref={summaryRef} className="flex ">
            <div className={"basis-3/4"}>
              <SummaryDetails stringParams={stringParams} />
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
        stringParams={stringParams}
        visible={visible}
      />
    </div>
  );
};

export default ConfiguratorPro;
