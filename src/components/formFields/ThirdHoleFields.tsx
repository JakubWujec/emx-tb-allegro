import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { TermoblockHolesContext } from "../../hooks/useTermoblockHoles";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { ThirdHoleType } from "../../types";
import { MinMaxDescription } from "../MinMaxDescription";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

const ThirdHoleFields = ({ needsPositionStringSelect = true }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ThirdHoleType & Required<{ hasThirdHole: boolean }>>();
  const thirdHoleType = watch("thirdHole.holeType");
  const hasThirdHole = watch("hasThirdHole");

  const { termoblockHoles: holeTypes } = useContext(TermoblockHolesContext);

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
            defaultValue={holeTypes[0]?.name}
            registration={register("thirdHole.holeType")}
          ></SelectField>
          {needsPositionStringSelect && (
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
          )}

          {thirdHoleType === "okrągły na rurę bez uchwytu" && (
            <>
              <InputField
                label="Średnica (zewnętrzna) trzeciego otworu (mm)"
                error={errors.thirdHole?.diameter}
                type="number"
                registration={register("thirdHole.diameter", {
                  valueAsNumber: true,
                })}
              ></InputField>
              <MinMaxDescription
                minValue={80}
                maxValue={250}
              ></MinMaxDescription>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ThirdHoleFields;
