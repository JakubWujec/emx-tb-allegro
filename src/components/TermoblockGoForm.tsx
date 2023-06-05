import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { holeTypes, stringPositions } from "../schema/termoblockHole.schema";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { CreateTermoblockGoItemInput } from "../schema/termoblockGo.schema";
import { hinges, plHinges } from "../schema/hinge.schema";
import { colors, plColors } from "../schema/color.schema";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";
import PowerCordHoleFields from "./FormFields/PowerCordHoleFields";
import FirstHoleFields from "./FormFields/FirstHoleFields";

interface TermoblockGoFormProps {
  register: UseFormRegister<CreateTermoblockGoItemInput>;
  handleSubmit: UseFormHandleSubmit<CreateTermoblockGoItemInput>;
  errors: FieldErrors<CreateTermoblockGoItemInput>;
  onSubmit: SubmitHandler<CreateTermoblockGoItemInput>;
  watch: UseFormWatch<CreateTermoblockGoItemInput>;
}

const TermoblockGoForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  watch,
}: TermoblockGoFormProps) => {
  const firstHoleType = watch("firstHole.holeType");
  const hasSecondHole = watch("hasSecondHole");
  const secondHoleType = watch("secondHole.holeType");
  const hasPowerCordHole = watch("hasPowerCordHole");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <WidthAndHeightFields></WidthAndHeightFields>
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
        <FirstHoleFields />

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
              error={errors.secondHole?.holeType}
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
              error={errors.secondHole?.stringPosition}
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
    </>
  );
};

export default TermoblockGoForm;