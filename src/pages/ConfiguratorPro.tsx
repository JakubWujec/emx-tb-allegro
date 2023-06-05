import { zodResolver } from "@hookform/resolvers/zod";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import PriceFooter from "../components/PriceFooter";
import Summary from "../components/Summary";
import TermoblockProForm from "../components/forms/TermoblockProForm";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockProItemInput,
  createTermoblockProItemSchema,
} from "../schema/termoblockPro.schema";

const ConfiguratorPro = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {})
  const visible = !entry?.isIntersecting

  const formMethods = useForm<CreateTermoblockProItemInput>({
    resolver:
      createTermoblockProItemSchema &&
      zodResolver(createTermoblockProItemSchema),
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid = (formMethods.formState.isDirty && Object.keys(formMethods.formState.errors).length === 0)

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

export default ConfiguratorPro;
