import { useFormContext } from "react-hook-form";
import { holeTypes, stringPositions } from "../../schema/termoblockHole.schema";
import { SecondHoleType } from "../../types";
import { InputField } from "../InputField";
import { SelectField } from "../SelectField";
import useFetch from "../../hooks/useFetch";
import BASE_API_URL from "../../url";

const SecondHoleFields = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<SecondHoleType & { hasSecondHole: boolean }>>();

  const { data: holeTypes, error } = useFetch<
    {
      id: number;
      name: string;
      termoblockHoleTypeId: number;
    }[]
  >(`${BASE_API_URL}/tbAllegro/termoblockHoleProducts`);

  const secondHoleType = watch("secondHole.holeType");
  const hasSecondHole = watch("hasSecondHole");

  if (!holeTypes) {
    return null;
  }

  return (
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
      {hasSecondHole && (
        <>
          <SelectField
            options={holeTypes.map((holeType) => {
              return {
                value: holeType.name,
                label: holeType.name,
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
        </>
      )}
    </div>
  );
};

export default SecondHoleFields;
