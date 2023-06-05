import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import useShoppingCart from "../../hooks/useShoppingCart";
import {
  CreateTermoblockItemInput,
  createTermoblockItemSchema,
} from "../../schema/termoblockItem.schema";
import ColorFields from "../formFields/ColorFields";
import FelcField from "../formFields/FelcField";
import FirstHoleFields from "../formFields/FirstHoleFields";
import HingesFields from "../formFields/HingeFields";
import PowerCordHoleFields from "../formFields/PowerCordHoleFields";
import SecondHoleFields from "../formFields/SecondHoleFields";
import WidthAndHeightFields from "../formFields/WidthAndHeightFields";

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
