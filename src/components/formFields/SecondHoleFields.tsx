import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { TermoblockHolesContext } from "../../hooks/useTermoblockHoles";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { SecondHoleType } from "../../types";
import { MinMaxDescription } from "../MinMaxDescription";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

const SecondHoleFields = ({ needsPositionStringSelect = true }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<SecondHoleType & Required<{ hasSecondHole: boolean }>>();
  const { termoblockHoles: holeTypes } = useContext(TermoblockHolesContext);

  const secondHoleType = watch("secondHole.holeType");
  const hasSecondHole = watch("hasSecondHole");

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
            defaultValue={holeTypes[0]?.name}
            error={errors.secondHole?.holeType}
            registration={register("secondHole.holeType")}
          ></SelectField>
          {needsPositionStringSelect && (
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
          )}

          {secondHoleType === "okrągły na rurę bez uchwytu" && (
            <>
              <InputField
                label="Średnica (zewnętrzna) drugiego otworu (mm)"
                error={errors.secondHole?.diameter}
                type="number"
                registration={register("secondHole.diameter", {
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

export default SecondHoleFields;
