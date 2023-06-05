import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockGoItemInput,
  createTermoblockGoItemSchema,
} from "../schema/termoblockGo.schema";
import TermoblockGoForm from "../components/forms/TermoblockGoForm";

const ConfiguratorGo = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const formMethods = useForm<CreateTermoblockGoItemInput>({
    resolver:
      createTermoblockGoItemSchema && zodResolver(createTermoblockGoItemSchema),
  });

  console.log(formMethods.formState.errors);

  function onSubmit(values: CreateTermoblockGoItemInput) {
    console.log(values, formMethods.formState.errors);
    addItem({
      id: 1,
      name: "Termoblock Go",
      price: 45,
      quantity: 1,
      details: values,
    });
  }

  return (
    <div className="relative">
      <TermoblockGoForm formMethods={formMethods} onSubmit={onSubmit} />
    </div>
  );
};

export default ConfiguratorGo;
