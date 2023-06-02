import { FormProvider, useForm } from "react-hook-form";
import {
  CreateTermoblockItemInput,
  createTermoblockItemSchema,
} from "../schema/termoblockItem.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import PriceFooter from "./PriceFooter";
import useShoppingCart from "../hooks/useShoppingCart";
import { holeTypes, stringPositions } from "../schema/termoblockHole.schema";
import { colors, plColors } from "../schema/color.schema";
import { hinges, plHinges } from "../schema/hinge.schema";
import PowerCordHoleFields from "./FormFields/PowerCordHoleFields";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";
import FirstHoleFields from "./FormFields/FirstHoleFields";

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
    addItem({
      id: 1,
      name: "TB",
      price: 35.0,
      quantity: 1,
      details: values,
    });
  }

  const firstHoleType = watch("firstHole.holeType");
  const hasSecondHole = watch("hasSecondHole");
  const secondHoleType = watch("secondHole.holeType");
  const hasPowerCordHole = watch("hasPowerCordHole");
  const termoblock = watch();

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
        <div className="mb-4">
          <SelectField
            options={colors.map((color) => {
              return {
                value: color,
                label: plColors[color],
              };
            })}
            label="Kolor"
            error={errors.color}
            registration={register("color")}
          ></SelectField>
        </div>
        <div className="mb-4">
          <SelectField
            options={hinges.map((hinge) => {
              return {
                value: hinge,
                label: plHinges[hinge],
              };
            })}
            label="Zawiasy"
            error={errors.hinges}
            registration={register("hinges")}
          ></SelectField>
        </div>
        <FirstHoleFields></FirstHoleFields>

        <div className="mb-4">
          <SelectField
            options={["Nie", "Tak"].map((val) => {
              return {
                value: val,
                label: val,
              };
            })}
            label="Drugi otwór?"
            error={errors.hasSecondHole}
            registration={register("hasSecondHole", {
              setValueAs(value) {
                return value === "Tak";
              },
            })}
          ></SelectField>
        </div>

        {hasSecondHole && (
          <div className="mb-4">
            <SelectField
              options={holeTypes.map((holeType) => {
                return {
                  value: holeType,
                  label: holeType,
                };
              })}
              label="Rodzaj drugiego otworu"
              error={errors.hinges}
              registration={register("secondHole.holeType")}
            ></SelectField>
            <SelectField
              options={stringPositions.map((stringPosition) => {
                return {
                  value: stringPosition,
                  label: stringPosition,
                };
              })}
              label="Położenie drugiego otworu (patrząc z zewnątrz)"
              error={errors.hinges}
              registration={register("secondHole.stringPosition")}
            ></SelectField>

            {secondHoleType === "okrągły na rurę bez uchwytu" && (
              <InputField
                label="Średnica (zewnętrzna) drugiego otworu (mm)"
                error={errors.secondHole?.diameter}
                type="number"
                registration={register("secondHole.diameter", {
                  valueAsNumber: true,
                })}
              ></InputField>
            )}
          </div>
        )}

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
