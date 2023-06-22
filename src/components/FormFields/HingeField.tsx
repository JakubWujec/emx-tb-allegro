import { useFormContext } from "react-hook-form";
import { SelectField } from "./SelectField";
import { hinges } from "../../schema/hinge.schema";

const HingeField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Required<{ hinges: string }>>();

  return (
    <div className="mb-4">
      <SelectField
        options={hinges.map((hinge) => {
          return {
            value: hinge,
            label: hinge,
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
