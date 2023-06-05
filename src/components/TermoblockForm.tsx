import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import {
  CreateTermoblockItemInput,
  createTermoblockItemSchema,
} from "../schema/termoblockItem.schema";
import ColorFields from "./FormFields/ColorFields";
import FelcField from "./FormFields/FelcField";
import FirstHoleFields from "./FormFields/FirstHoleFields";
import HingesFields from "./FormFields/HingeFields";
import PowerCordHoleFields from "./FormFields/PowerCordHoleFields";
import SecondHoleFields from "./FormFields/SecondHoleFields";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";

const TermoblockForm = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  const formMethods = useForm<CreateTermoblockItemInput>({
    resolver:
      createTermoblockItemSchema && zodResolver(createTermoblockItemSchema),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods;

  function onSubmit(values: CreateTermoblockItemInput) {
    console.log(values);
    addItem({
      id: 1,
      name: "TB",
      price: 35.0,
      quantity: 1,
      details: values,
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <WidthAndHeightFields></WidthAndHeightFields>
        <FelcField />
        <ColorFields></ColorFields>
        <HingesFields></HingesFields>
        <FirstHoleFields></FirstHoleFields>
        <SecondHoleFields></SecondHoleFields>
        <PowerCordHoleFields />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Zapisz
        </button>
      </form>
    </FormProvider>
  );
};

export default TermoblockForm;
