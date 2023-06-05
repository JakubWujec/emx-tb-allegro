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

const ConfiguratorPro = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(true);
  const summaryRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Określa, kiedy komponent Summary jest uważany za widoczny
    };

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsSummaryVisible(!entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (summaryRef.current) {
      observer.observe(summaryRef.current);
    }

    return () => {
      if (summaryRef.current) {
        observer.unobserve(summaryRef.current);
      }
    };
  }, []);

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
