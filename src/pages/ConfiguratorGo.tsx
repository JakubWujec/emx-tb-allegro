import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockGoItemInput,
  createTermoblockGoItemSchema,
} from "../schema/termoblockGo.schema";
import TermoblockGoForm from "../components/forms/TermoblockGoForm";
import { useEffect, useRef, useState } from "react";
import PriceFooter from "../components/PriceFooter";
import Summary from "../components/Summary";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import calculatePrice from "../utils/calculatePrice";

const ConfiguratorGo = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {});
  const visible = !entry?.isIntersecting;

  const formMethods = useForm<CreateTermoblockGoItemInput>({
    resolver:
      createTermoblockGoItemSchema && zodResolver(createTermoblockGoItemSchema),
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0;
  const price = calculatePrice(termoblock);

  function onSubmit(values: CreateTermoblockGoItemInput) {
    console.log(values, formMethods.formState.errors);
    addItem({
      id: 1,
      name: "Termoblock Go",
      price: price,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TermoblockGoForm formMethods={formMethods} onSubmit={onSubmit} />
      <PriceFooter
        isValid={termoblockIsValid}
        termoblock={termoblock}
        visible={visible}
      />

      <div ref={summaryRef}>
        <Summary isValid={termoblockIsValid} termoblock={termoblock} />
      </div>
    </div>
  );
};

export default ConfiguratorGo;
