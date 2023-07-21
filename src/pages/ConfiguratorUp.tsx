import { zodResolver } from "@hookform/resolvers/zod";

import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MinMaxDescription } from "../components/MinMaxDescription";
import SubmitWithPricing from "../components/SubmitWithPricing";
import SummaryDetails from "../components/SummaryDetails";
import { TitleHeader } from "../components/TitleHeader";
import FirstHoleFields from "../components/formFields/FirstHoleFields";
import HeightField from "../components/formFields/HeightField";
import SecondHoleFields from "../components/formFields/SecondHoleFields";
import WidthField from "../components/formFields/WidthField";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";
import {
  CreateTermoblockUpItemInput,
  TB_UP_MAX_HEIGHT,
  TB_UP_MAX_WIDTH,
  TB_UP_MIN_HEIGHT,
  TB_UP_MIN_WIDTH,
  createTermoblockUpItemSchema,
} from "../schema/termoblockUp.schema";
import calculatePrice from "../utils/calculatePrice";
import termoblockToStringParams from "../utils/termoblockToStringParams";
import { NotificationContext } from "../hooks/useNotificationsProvider";

const ConfiguratorUp = () => {
  const { addItem } = useContext(ShoppingCartContext);
  const { addNotification } = useContext(NotificationContext);

  const formMethods = useForm<CreateTermoblockUpItemInput>({
    resolver:
      createTermoblockUpItemSchema && zodResolver(createTermoblockUpItemSchema),
    mode: "onBlur",
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0 &&
    createTermoblockUpItemSchema.safeParse(termoblock).success;

  const price = calculatePrice({ ...termoblock, name: "Termoblock Up" });
  const stringParams = termoblockToStringParams(termoblock);

  function onSubmit(values: CreateTermoblockUpItemInput) {
    addItem({
      name: values.name ?? "Termoblock Up",
      productTypeId: 2,
      price: price,
      quantity: 1,
      details: values,
    });
    addNotification({
      type: "info",
      title: "Dodano do koszyka",
      message: "Dodano do koszyka",
    });
  }

  return (
    <div className="relative">
      <TitleHeader title="Rama okienna Warmtec Termoblock Up"></TitleHeader>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <WidthField></WidthField>
          <MinMaxDescription
            minValue={TB_UP_MIN_WIDTH}
            maxValue={TB_UP_MAX_WIDTH}
          ></MinMaxDescription>
          <HeightField></HeightField>
          <MinMaxDescription
            minValue={TB_UP_MIN_HEIGHT}
            maxValue={TB_UP_MAX_HEIGHT}
          ></MinMaxDescription>
          <FirstHoleFields needsPositionStringSelect={false}></FirstHoleFields>
          <SecondHoleFields
            needsPositionStringSelect={false}
          ></SecondHoleFields>
          <div className="flex ">
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
    </div>
  );
};

export default ConfiguratorUp;
