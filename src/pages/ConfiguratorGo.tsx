import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import TermoblockGoForm from "../components/TermoblockGoForm";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockGoItemInput,
  createTermoblockGoItemSchema,
} from "../schema/termoblockGo.schema";

const ConfiguratorGo = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTermoblockGoItemInput>({
    resolver:
      createTermoblockGoItemSchema && zodResolver(createTermoblockGoItemSchema),
  });

  function onSubmit(values: CreateTermoblockGoItemInput) {
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
      <TermoblockGoForm
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        watch={watch}
      />
      {/* <PriceFooter termoblock=></PriceFooter> */}
    </div>
  );
};

export default ConfiguratorGo;
