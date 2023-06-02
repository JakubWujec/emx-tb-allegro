import { useFormContext } from "react-hook-form";
import { InputField } from "../InputField";

const WidthAndHeightFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <InputField
        label="Szerokość"
        error={errors.width}
        type="number"
        registration={register("width", { valueAsNumber: true })}
      ></InputField>

      <InputField
        label="Wysokość"
        error={errors.height}
        type="number"
        registration={register("height", { valueAsNumber: true })}
      ></InputField>
    </>
  );
};

export default WidthAndHeightFields;
