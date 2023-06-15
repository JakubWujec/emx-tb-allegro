import { useFormContext } from "react-hook-form";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { ThirdHoleType } from "../../types";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import useFetch from "../../hooks/useFetch";
import BASE_API_URL from "../../url";

const ThirdHoleFields = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<ThirdHoleType & { hasThirdHole: boolean }>>();
  const thirdHoleType = watch("thirdHole.holeType");
  const hasThirdHole = watch("hasThirdHole");

  const { data: holeTypes, error } = useFetch<
    {
      id: number;
      name: string;
      termoblockHoleTypeId: number;
    }[]
  >(`${BASE_API_URL}/tbAllegro/termoblockHoleProducts`);

  if (!holeTypes) {
    return null;
  }

  return (
    <div className="mb-4">
      <SelectField
        options={[
          {
            value: "Nie",
            label: "Nie",
          },
          {
            value: "Tak",
            label: "Tak (+50zł)",
          },
        ]}
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
                value: holeType.name,
                label: holeType.name,
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
