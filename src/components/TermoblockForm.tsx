import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import useShoppingCart from "../hooks/useShoppingCart";
import { colors, plColors } from "../schema/color.schema";
import { hinges, plHinges } from "../schema/hinge.schema";
import { holeTypes, stringPositions } from "../schema/termoblockHole.schema";
import {
  CreateTermoblockItemInput,
  createTermoblockItemSchema,
} from "../schema/termoblockItem.schema";
import FirstHoleFields from "./FormFields/FirstHoleFields";
import PowerCordHoleFields from "./FormFields/PowerCordHoleFields";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import SecondHoleFields from "./FormFields/SecondHoleFields";
import ColorFields from "./FormFields/ColorFields";
import HingesFields from "./FormFields/HingesFields";

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
        <div className="mb-4">
          <InputField
            label="Felc"
            error={errors.felc}
            type="number"
            registration={register("felc", { valueAsNumber: true })}
          ></InputField>
        </div>
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
