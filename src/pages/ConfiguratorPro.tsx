import { zodResolver } from "@hookform/resolvers/zod";

import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SubmitWithPricing from "../components/SubmitWithPricing";
import SummaryDetails from "../components/SummaryDetails";

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
import { NotificationContext } from "../hooks/useNotificationsProvider";

const ConfiguratorPro = () => {
  const { addItem } = useContext(ShoppingCartContext);
  const { addNotification } = useContext(NotificationContext);

  const formMethods = useForm<CreateTermoblockProItemInput>({
    resolver:
      createTermoblockProItemSchema &&
      zodResolver(createTermoblockProItemSchema),
    mode: "onBlur",
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
      name: values.name ?? "Termoblock Pro",
      productTypeId: 1,
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
      <TitleHeader title="Rama okienna Warmtec TermoBlock PRO"></TitleHeader>
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

          <div className="flex">
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

export default ConfiguratorPro;
