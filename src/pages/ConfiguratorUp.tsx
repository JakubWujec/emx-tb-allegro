import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import TermoblockUpForm from "../components/TermoblockUpForm";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockUpItemInput,
  createTermoblockUpItemSchema,
} from "../schema/termoblockUp.schema";

const ConfiguratorUp = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTermoblockUpItemInput>({
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
      <TermoblockUpForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        watch={watch}
      />
    </div>
  );
};

export default ConfiguratorUp;
