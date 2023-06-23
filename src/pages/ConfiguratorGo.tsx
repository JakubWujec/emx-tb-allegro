import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import SubmitWithPricing from "../components/SubmitWithPricing";
import SummaryDetails from "../components/SummaryDetails";
import ColorFields from "../components/formFields/ColorFields";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import HingeField from "../components/formFields/HingeField";
import PowerCordHoleFields from "../components/formFields/PowerCordHoleFields";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import WidthAndHeightFields from "../components/formFields/WidthAndHeightFields";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";
import {
  CreateTermoblockGoItemInput,
  createTermoblockGoItemSchema,
} from "../schema/termoblockGo.schema";
import calculatePrice from "../utils/calculatePrice";
import { TitleHeader } from "../components/TitleHeader";

const ConfiguratorGo = () => {
  const { addItem } = useContext(ShoppingCartContext);

  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {});
  const visible = !entry?.isIntersecting;

  const formMethods = useForm<CreateTermoblockGoItemInput>({
    resolver:
      createTermoblockGoItemSchema && zodResolver(createTermoblockGoItemSchema),
    mode: "onBlur",
    shouldUnregister: true,
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0 &&
    createTermoblockGoItemSchema.safeParse(termoblock).success;

  const price = calculatePrice({ ...termoblock, name: "Termoblock Go" });

  function onSubmit(values: CreateTermoblockGoItemInput) {
    addItem({
      id: 1,
      name: values.name ?? "Termoblock Go",
      productTypeId: 3,
      price: price,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TitleHeader title="Termoblock Go"></TitleHeader>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <WidthAndHeightFields></WidthAndHeightFields>
          <ColorFields></ColorFields>
          <HingeField></HingeField>
          <FirstHoleFields />
          <SecondHoleFields></SecondHoleFields>
          <PowerCordHoleFields />
          <div ref={summaryRef} className="flex ">
            <div className={"basis-3/4"}>
              <SummaryDetails termoblock={termoblock} />
            </div>
            <div className="basis-1/4 m-4 w-full text-center justify-center flex">
              <SubmitWithPricing
                price={termoblockIsValid ? price : 0}
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

export default ConfiguratorGo;
