import { useFormContext } from "react-hook-form";
import { colors } from "../../schema/color.schema";
import { SelectField } from "./SelectField";

const ColorsFields = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<{ color: string }>>();

  return (
    <div className="mb-4">
      <SelectField
        options={colors.map((color) => {
          return {
            value: color,
            label: color,
          };
        })}
        label="Kolor"
        error={errors.color}
        registration={register("color")}
      ></SelectField>
    </div>
  );
};

export default ColorsFields;
