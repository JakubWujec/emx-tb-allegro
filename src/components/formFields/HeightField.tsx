import { useFormContext } from "react-hook-form";
import { InputField } from "./InputField";

const HeightField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Required<{ height: number }>>();

  return (
    <InputField
      label="Wysokość (mm)"
      error={errors.height}
      type="number"
      registration={register("height", { valueAsNumber: true })}
    ></InputField>
  );
};

export default HeightField;
