import { useContext, useEffect } from "react";
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
    resetField,
  } = useFormContext<ThirdHoleType & Required<{ hasThirdHole: boolean }>>();
  const thirdHoleType = watch("thirdHole.holeType");
  const hasThirdHole = watch("hasThirdHole");

  const { termoblockHoles: holeTypes } = useContext(TermoblockHolesContext);

  // gdy hasThirdHole zmieni się na true, ustaw domyślne wartości
  useEffect(() => {
    if (hasThirdHole) {
      resetField("thirdHole", {
        defaultValue: {
          stringPosition: stringPositions[0],
          holeType: holeTypes[0].name,
        },
      });
    }
  }, [hasThirdHole, holeTypes, resetField]);

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

          {thirdHoleType === "okrągły na rurę bez uchwytu" && (
            <>
              <InputField
                label="Średnica (zewnętrzna) trzeciego otworu (mm)"
                error={errors.thirdHole?.diameter}
                type="number"
                registration={register("thirdHole.diameter", {
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
              label="Położenie trzeciego otworu (patrząc z zewnątrz)"
              error={errors.thirdHole?.stringPosition}
              registration={register("thirdHole.stringPosition")}
            ></SelectField>
          )}
        </>
      )}
    </div>
  );
};

export default ThirdHoleFields;
