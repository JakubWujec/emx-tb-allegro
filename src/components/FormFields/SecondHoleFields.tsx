import { FieldValues, useFormContext } from "react-hook-form";
import { InputField } from "../InputField";
import { SelectField } from "../SelectField";
import { holeTypes, stringPositions } from "../../schema/termoblockHole.schema";
import { FirstHoleType, TermoblockItem, SecondHoleType } from "../../types";

const SecondHoleFields = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<SecondHoleType>>();
  const secondHoleType = watch("secondHole.holeType");

  return (
    <div className="mb-4">
      <SelectField
        options={holeTypes.map((holeType) => {
          return {
            value: holeType,
            label: holeType,
          };
        })}
        label="Rodzaj pierwszego otworu"
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
        label="Położenie pierwszego otworu (patrząc z zewnątrz)"
        error={errors.secondHole?.stringPosition}
        registration={register("secondHole.stringPosition")}
      ></SelectField>

      {secondHoleType === "okrągły na rurę bez uchwytu" && (
        <InputField
          label="Średnica (zewnętrzna) pierwszego otworu (mm)"
          error={errors.secondHole?.diameter}
          type="number"
          registration={register("secondHole.diameter", {
            valueAsNumber: true,
          })}
        ></InputField>
      )}
    </div>
  );
};

export default SecondHoleFields;
