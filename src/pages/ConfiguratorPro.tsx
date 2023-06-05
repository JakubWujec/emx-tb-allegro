import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockProItemInput,
  createTermoblockProItemSchema,
} from "../schema/termoblockPro.schema";
import TermoblockProForm from "../components/forms/TermoblockProForm";
import { useEffect, useRef, useState } from "react";
import PriceFooter from "../components/PriceFooter";
import Summary from "../components/Summary";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const ConfiguratorPro = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {})
  const isSummaryVisible = !entry?.isIntersecting

  const formMethods = useForm<CreateTermoblockProItemInput>({
    resolver:
      createTermoblockProItemSchema &&
      zodResolver(createTermoblockProItemSchema),
  });

  const termoblock = formMethods.watch();

  function onSubmit(values: CreateTermoblockProItemInput) {
    addItem({
      id: 3,
      name: "Termoblock Pro",
      price: 36,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TermoblockProForm formMethods={formMethods} onSubmit={onSubmit} />
      <PriceFooter
        isValid={true}
        termoblock={termoblock}
        visible={isSummaryVisible}
      />

      <div ref={summaryRef}>
        <Summary isValid={true} termoblock={termoblock} />
      </div>
    </div>
  );
};

export default ConfiguratorPro;
