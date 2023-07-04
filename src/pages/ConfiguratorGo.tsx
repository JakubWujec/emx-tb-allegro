import { zodResolver } from "@hookform/resolvers/zod";

import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MinMaxDescription } from "../components/MinMaxDescription";
import SubmitWithPricing from "../components/SubmitWithPricing";
import SummaryDetails from "../components/SummaryDetails";
import { TitleHeader } from "../components/TitleHeader";
import ColorFields from "../components/formFields/ColorFields";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import HeightField from "../components/formFields/HeightField";
import HingeField from "../components/formFields/HingeField";
import PowerCordHoleFields from "../components/formFields/PowerCordHoleFields";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import WidthField from "../components/formFields/WidthField";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";
import {
  CreateTermoblockGoItemInput,
  TB_GO_MAX_HEIGHT,
  TB_GO_MAX_WIDTH,
  TB_GO_MIN_HEIGHT,
  TB_GO_MIN_WIDTH,
  createTermoblockGoItemSchema,
} from "../schema/termoblockGo.schema";
import calculatePrice from "../utils/calculatePrice";
import termoblockToStringParams from "../utils/termoblockToStringParams";

const ConfiguratorGo = () => {
  const { addItem } = useContext(ShoppingCartContext);

  const formMethods = useForm<CreateTermoblockGoItemInput>({
    resolver:
      createTermoblockGoItemSchema && zodResolver(createTermoblockGoItemSchema),
    mode: "onBlur",
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0 &&
    createTermoblockGoItemSchema.safeParse(termoblock).success;

  const price = calculatePrice({ ...termoblock, name: "Termoblock Go" });
  const stringParams = termoblockToStringParams(termoblock);

  function onSubmit(values: CreateTermoblockGoItemInput) {
    addItem({
      name: values.name ?? "Termoblock Go",
      productTypeId: 3,
      price: price,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TitleHeader title="Rama okienna Warmtec Termoblock Go"></TitleHeader>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <WidthField></WidthField>
          <MinMaxDescription
            minValue={TB_GO_MIN_WIDTH}
            maxValue={TB_GO_MAX_WIDTH}
          ></MinMaxDescription>
          <HeightField></HeightField>
          <MinMaxDescription
            minValue={TB_GO_MIN_HEIGHT}
            maxValue={TB_GO_MAX_HEIGHT}
          ></MinMaxDescription>
          <ColorFields></ColorFields>
          <HingeField></HingeField>
          <FirstHoleFields positionStringSide="od zewnątrz" />
          <SecondHoleFields positionStringSide="od zewnątrz"></SecondHoleFields>
          <PowerCordHoleFields />
          <div className="flex ">
            <div className={"basis-3/4"}>
              <SummaryDetails stringParams={stringParams} />
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
    </div>
  );
};

export default ConfiguratorGo;
