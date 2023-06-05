import { useFormContext } from "react-hook-form";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { SelectField } from "../SelectField";
import { TermoblockItem } from "../../types";

const PowerCordHoleFields = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<
    Required<{
      hasPowerCordHole: boolean;
      powerCordHole: { stringPosition: string };
    }>
  >();

  const hasPowerCordHole = watch("hasPowerCordHole");

  return (
    <>
      <SelectField
        options={["Nie", "Tak"].map((val) => {
          return {
            value: val,
            label: val,
          };
        })}
        error={errors.hasPowerCordHole}
        label="Otwór na przewód zasilający?"
        registration={register("hasPowerCordHole", {
          setValueAs(value) {
            return value === "Tak";
          },
        })}
      ></SelectField>
      {hasPowerCordHole && (
        <div className="mb-4">
          <SelectField
            options={stringPositions.map((stringPosition) => {
              return {
                value: stringPosition,
                label: stringPosition,
              };
            })}
            error={errors.hasPowerCordHole}
            label="Pozycja otworu na przewód zasilający (patrząc z zewnątrz)"
            registration={register("powerCordHole.stringPosition")}
          ></SelectField>
        </div>
      )}
    </>
  );
};

export default PowerCordHoleFields;
