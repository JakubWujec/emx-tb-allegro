import { useFormContext } from "react-hook-form";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { FirstHoleType } from "../../types";
import { InputField } from "../InputField";
import { SelectField } from "../SelectField";
import useFetch from "../../hooks/useFetch";
import BASE_API_URL from "../../url";

const FirstHoleFields = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<FirstHoleType>>();
  const { data: holeTypes, error } = useFetch<
    {
      id: number;
      name: string;
      termoblockHoleTypeId: number;
    }[]
  >(`${BASE_API_URL}/tbAllegro/termoblockHoleProducts`);

  const firstHoleType = watch("firstHole.holeType");

  if (!holeTypes) {
    return null;
  }

  return (
    <div className="mb-4">
      <SelectField
        options={holeTypes.map((holeType) => {
          return {
            value: holeType.name,
            label: holeType.name,
          };
        })}
        label="Rodzaj pierwszego otworu"
        error={errors.firstHole?.holeType}
        registration={register("firstHole.holeType")}
      ></SelectField>
      <SelectField
        options={stringPositions.map((stringPosition) => {
          return {
            value: stringPosition,
            label: stringPosition,
          };
        })}
        label="Położenie pierwszego otworu (patrząc z zewnątrz)"
        error={errors.firstHole?.stringPosition}
        registration={register("firstHole.stringPosition")}
      ></SelectField>

      {firstHoleType === "okrągły na rurę bez uchwytu" && (
        <InputField
          label="Średnica (zewnętrzna) pierwszego otworu (mm)"
          error={errors.firstHole?.diameter}
          type="number"
          registration={register("firstHole.diameter", {
            valueAsNumber: true,
          })}
        ></InputField>
      )}
    </div>
  );
};

export default FirstHoleFields;
