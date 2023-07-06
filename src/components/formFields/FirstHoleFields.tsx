import { useFormContext } from "react-hook-form";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { FirstHoleType } from "../../types";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { MinMaxDescription } from "../MinMaxDescription";
import { useContext, useEffect } from "react";
import { TermoblockHolesContext } from "../../hooks/useTermoblockHoles";

const FirstHoleFields = ({
  needsPositionStringSelect = true,
  positionStringSide = "od wewnątrz",
}) => {
  const {
    register,
    formState: { errors },
    watch,
    resetField,
  } = useFormContext<FirstHoleType>();
  const { termoblockHoles: holeTypes } = useContext(TermoblockHolesContext);
  const firstHoleType = watch("firstHole.holeType");

  console.log(watch("firstHole"));
  useEffect(() => {
    console.log("XXXX");
    if (holeTypes && holeTypes.length) {
      if (needsPositionStringSelect) {
        resetField("firstHole", {
          defaultValue: {
            stringPosition: stringPositions[0],
            holeType: holeTypes[0].name,
          },
        });
      } else {
        resetField("firstHole", {
          defaultValue: {
            holeType: holeTypes[0].name,
          },
        });
      }
    }
  }, [holeTypes, needsPositionStringSelect, resetField]);

  if (!holeTypes.length) return null;

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

      {needsPositionStringSelect && (
        <SelectField
          options={stringPositions.map((stringPosition) => {
            return {
              value: stringPosition,
              label: stringPosition,
            };
          })}
          label={`Położenie pierwszego otworu (patrząc ${positionStringSide})`}
          error={errors.firstHole?.stringPosition}
          registration={register("firstHole.stringPosition")}
        ></SelectField>
      )}

      {firstHoleType === "okrągły na rurę bez uchwytu" && (
        <>
          <InputField
            label="Średnica (zewnętrzna) pierwszego otworu (mm)"
            error={errors.firstHole?.diameter}
            type="number"
            registration={register("firstHole.diameter", {
              valueAsNumber: true,
              shouldUnregister: true,
            })}
          ></InputField>
          <MinMaxDescription minValue={80} maxValue={250}></MinMaxDescription>
        </>
      )}
    </div>
  );
};

export default FirstHoleFields;
