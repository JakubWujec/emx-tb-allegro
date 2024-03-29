import { useFormContext } from "react-hook-form";
import { InputField } from "./InputField";

const WidthAndHeightFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Required<{ width: number; height: number }>>();

  return (
    <>
      <InputField
        label="Szerokość (mm)"
        error={errors.width}
        type="number"
        registration={register("width", { valueAsNumber: true })}
      ></InputField>

      <InputField
        label="Wysokość (mm)"
        error={errors.height}
        type="number"
        registration={register("height", { valueAsNumber: true })}
      ></InputField>
    </>
  );
};

export default WidthAndHeightFields;
