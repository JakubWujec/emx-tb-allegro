import { useFormContext } from "react-hook-form";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { FirstHoleType } from "../../types";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { MinMaxDescription } from "../MinMaxDescription";
import { useContext } from "react";
import { TermoblockHolesContext } from "../../hooks/useTermoblockHoles";

const FirstHoleFields = ({ needsPositionStringSelect = true }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FirstHoleType>();
  const { termoblockHoles: holeTypes } = useContext(TermoblockHolesContext);
  const firstHoleType = watch("firstHole.holeType");

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
        placeholder="Wybierz rodzaj otworu"
        defaultValue="Wybierz rodzaj otworu"
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
          label="Położenie pierwszego otworu (patrząc z zewnątrz)"
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
            })}
          ></InputField>
          <MinMaxDescription minValue={80} maxValue={250}></MinMaxDescription>
        </>
      )}
    </div>
  );
};

export default FirstHoleFields;
