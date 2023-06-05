import { useFormContext } from "react-hook-form";
import { holeTypes, stringPositions } from "../../schema/termoblockHole.schema";
import { ThirdHoleType } from "../../types";
import { InputField } from "../InputField";
import { SelectField } from "../SelectField";

const ThirdHoleFields = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<ThirdHoleType & { hasThirdHole: boolean }>>();
  const thirdHoleType = watch("thirdHole.holeType");
  const hasThirdHole = watch("hasThirdHole");

  return (
    <div className="mb-4">
      <SelectField
        options={["Nie", "Tak"].map((val) => {
          return {
            value: val,
            label: val,
          };
        })}
        label="Trzeci otwór?"
        error={errors.hasThirdHole}
        registration={register("hasThirdHole", {
          setValueAs(value) {
            return value === "Tak";
          },
        })}
      ></SelectField>
      {hasThirdHole && (
        <>
          <SelectField
            options={holeTypes.map((holeType) => {
              return {
                value: holeType,
                label: holeType,
              };
            })}
            label="Rodzaj trzeciego otworu"
            error={errors.thirdHole?.holeType}
            registration={register("thirdHole.holeType")}
          ></SelectField>
          <SelectField
            options={stringPositions.map((stringPosition) => {
              return {
                value: stringPosition,
                label: stringPosition,
              };
            })}
            label="Położenie trzeciego otworu (patrząc z zewnątrz)"
            error={errors.thirdHole?.stringPosition}
            registration={register("thirdHole.stringPosition")}
          ></SelectField>

          {thirdHoleType === "okrągły na rurę bez uchwytu" && (
            <InputField
              label="Średnica (zewnętrzna) trzeciego otworu (mm)"
              error={errors.thirdHole?.diameter}
              type="number"
              registration={register("thirdHole.diameter", {
                valueAsNumber: true,
              })}
            ></InputField>
          )}
        </>
      )}
    </div>
  );
};

export default ThirdHoleFields;
