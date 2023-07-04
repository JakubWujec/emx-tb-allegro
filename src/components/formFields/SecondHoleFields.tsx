import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { TermoblockHolesContext } from "../../hooks/useTermoblockHoles";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { SecondHoleType } from "../../types";
import { MinMaxDescription } from "../MinMaxDescription";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

const SecondHoleFields = ({
  needsPositionStringSelect = true,
  positionStringSide = "od wewnątrz",
}) => {
  const {
    register,
    formState: { errors },
    watch,
    resetField,
  } = useFormContext<SecondHoleType & Required<{ hasSecondHole: boolean }>>();
  const { termoblockHoles: holeTypes } = useContext(TermoblockHolesContext);

  const secondHoleType = watch("secondHole.holeType");
  const hasSecondHole = watch("hasSecondHole");

  // gdy hasSecondHole zmieni się na true, ustaw domyślne wartości
  useEffect(() => {
    if (hasSecondHole) {
      if (needsPositionStringSelect) {
        resetField("secondHole", {
          defaultValue: {
            stringPosition: stringPositions[0],
            holeType: holeTypes[0].name,
          },
        });
      } else {
        resetField("secondHole", {
          defaultValue: {
            holeType: holeTypes[0].name,
          },
        });
      }
    }
  }, [hasSecondHole, holeTypes, needsPositionStringSelect, resetField]);

  if (holeTypes.length === 0) {
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
          {secondHoleType === "okrągły na rurę bez uchwytu" && (
            <>
              <InputField
                label="Średnica (zewnętrzna) drugiego otworu (mm)"
                error={errors.secondHole?.diameter}
                type="number"
                registration={register("secondHole.diameter", {
                  valueAsNumber: true,
                  shouldUnregister: true,
                })}
              ></InputField>
              <MinMaxDescription
                minValue={80}
                maxValue={250}
              ></MinMaxDescription>
            </>
          )}

          {needsPositionStringSelect && (
            <SelectField
              options={stringPositions.map((stringPosition) => {
                return {
                  value: stringPosition,
                  label: stringPosition,
                };
              })}
              label={`Położenie drugiego otworu (patrząc ${positionStringSide})`}
              error={errors.secondHole?.stringPosition}
              registration={register("secondHole.stringPosition")}
            ></SelectField>
          )}
        </>
      )}
    </div>
  );
};

export default SecondHoleFields;
