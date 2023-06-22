import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import SubmitWithPricing from "../components/SubmitWithPricing";
import SummaryDetails from "../components/SummaryDetails";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import WidthAndHeightFields from "../components/formFields/WidthAndHeightFields";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import {
  CreateTermoblockUpItemInput,
  createTermoblockUpItemSchema,
} from "../schema/termoblockUp.schema";
import calculatePrice from "../utils/calculatePrice";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";

const ConfiguratorUp = () => {
  const { addItem } = useContext(ShoppingCartContext);

  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {});
  const visible = !entry?.isIntersecting;

  const formMethods = useForm<CreateTermoblockUpItemInput>({
    resolver:
      createTermoblockUpItemSchema && zodResolver(createTermoblockUpItemSchema),
    mode: "onBlur",
    shouldUnregister: true,
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0 &&
    createTermoblockUpItemSchema.safeParse(termoblock).success;
  const price = calculatePrice({ ...termoblock, name: "Termoblock Up" });

  function onSubmit(values: CreateTermoblockUpItemInput) {
    addItem({
      id: 3,
      name: values.name ?? "Termoblock Up",
      productTypeId: 2,
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
          <FirstHoleFields needsPositionStringSelect={false}></FirstHoleFields>
          <SecondHoleFields
            needsPositionStringSelect={false}
          ></SecondHoleFields>
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

export default ConfiguratorUp;
