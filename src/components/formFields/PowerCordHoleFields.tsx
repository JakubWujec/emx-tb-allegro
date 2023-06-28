import { useFormContext } from "react-hook-form";
import { stringPositions } from "../../schema/termoblockHole.schema";
import { SelectField } from "./SelectField";
import { useEffect } from "react";

const PowerCordHoleFields = () => {
  const {
    register,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext<
    Required<{
      hasPowerCordHole: boolean;
      powerCordHole: { stringPosition: string };
    }>
  >();

  const hasPowerCordHole = watch("hasPowerCordHole");

  // gdy hasPowerCordHole zmieni się na true, ustaw domyślne wartości
  useEffect(() => {
    if (hasPowerCordHole) {
      resetField("powerCordHole", {
        defaultValue: {
          stringPosition: stringPositions[0],
        },
      });
    }
  }, [hasPowerCordHole, resetField]);

  return (
    <>
      <SelectField
        options={[
          {
            value: "Nie",
            label: "Nie",
          },
          {
            value: "Tak",
            label: "Tak (+20zł)",
          },
        ]}
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
            defaultValue={stringPositions[0]}
            label="Pozycja otworu na przewód zasilający (patrząc z zewnątrz)"
            registration={register("powerCordHole.stringPosition")}
          ></SelectField>
        </div>
      )}
    </>
  );
};

export default PowerCordHoleFields;
