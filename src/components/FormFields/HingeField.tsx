import { useFormContext } from "react-hook-form";
import { hinges, plHinges } from "../../schema/hinge.schema";
import { SelectField } from "./SelectField";

const HingeField = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<{ hinges: string }>>();

  return (
    <div className="mb-4">
      <SelectField
        options={hinges.map((hinge) => {
          return {
            value: hinge,
            label: plHinges[hinge],
          };
        })}
        label="Zawiasy"
        error={errors.hinges}
        registration={register("hinges")}
      ></SelectField>
    </div>
  );
};

export default HingeField;
