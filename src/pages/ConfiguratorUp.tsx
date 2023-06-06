import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockUpItemInput,
  createTermoblockUpItemSchema,
} from "../schema/termoblockUp.schema";
import TermoblockUpForm from "../components/forms/TermoblockUpForm";
import { useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import PriceFooter from "../components/PriceFooter";
import Summary from "../components/Summary";

const ConfiguratorUp = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const summaryRef = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(summaryRef, {});
  const visible = !entry?.isIntersecting;

  const formMethods = useForm<CreateTermoblockUpItemInput>({
    resolver:
      createTermoblockUpItemSchema && zodResolver(createTermoblockUpItemSchema),
  });

  const termoblock = formMethods.watch();
  const termoblockIsValid =
    formMethods.formState.isDirty &&
    Object.keys(formMethods.formState.errors).length === 0;

  function onSubmit(values: CreateTermoblockUpItemInput) {
    addItem({
      id: 3,
      name: "Termoblock Up",
      price: 36,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TermoblockUpForm formMethods={formMethods} onSubmit={onSubmit} />
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

export default ConfiguratorUp;
