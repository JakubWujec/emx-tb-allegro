import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockUpItemInput,
  createTermoblockUpItemSchema,
} from "../schema/termoblockUp.schema";
import TermoblockUpForm from "../components/forms/TermoblockUpForm";

const ConfiguratorUp = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const formMethods = useForm<CreateTermoblockUpItemInput>({
    resolver:
      createTermoblockUpItemSchema && zodResolver(createTermoblockUpItemSchema),
  });

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
    </div>
  );
};

export default ConfiguratorUp;
