import { useFormContext } from "react-hook-form";
import { InputField } from "./InputField";

const FelcField = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<Required<{ felc: number }>>();

  return (
    <div className="mb-4">
      <InputField
        label="Grubość ramy okiennej / Felc (mm)"
        error={errors.felc}
        type="number"
        registration={register("felc", { valueAsNumber: true })}
      ></InputField>
    </div>
  );
};

export default FelcField;
