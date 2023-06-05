import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import TermoblockUpForm from "../components/TermoblockUpForm";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockProItemInput,
  createTermoblockProItemSchema,
} from "../schema/termoblockPro.schema";

const ConfiguratorPro = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const formMethods = useForm<CreateTermoblockProItemInput>({
    resolver:
      createTermoblockProItemSchema &&
      zodResolver(createTermoblockProItemSchema),
  });

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
      <TermoblockUpForm formMethods={formMethods} onSubmit={onSubmit} />
    </div>
  );
};

export default ConfiguratorPro;
