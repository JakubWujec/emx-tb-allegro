import { useFormContext } from "react-hook-form";
import { InputField } from "./InputField";

const WidthField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Required<{ width: number }>>();

  return (
    <InputField
      label="Szerokość (mm)"
      error={errors.width}
      type="number"
      registration={register("width", { valueAsNumber: true })}
    ></InputField>
  );
};

export default WidthField;
