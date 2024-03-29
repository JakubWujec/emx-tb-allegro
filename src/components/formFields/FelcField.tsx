import { useFormContext } from "react-hook-form";
import { InputField } from "./InputField";

const FelcField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Required<{ felc: number }>>();

  return (
    <div>
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
