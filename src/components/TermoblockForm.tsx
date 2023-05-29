import { useForm } from "react-hook-form";
import {
  CreateTermoblockItemInput,
  createTermoblockItemSchema,
} from "../schema/termoblockItem.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./InputField";

const TermoblockForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTermoblockItemInput>({
    resolver:
      createTermoblockItemSchema && zodResolver(createTermoblockItemSchema),
  });

  function onSubmit(values: CreateTermoblockItemInput) {
    console.log(values, errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <InputField
          label="Szerokość"
          error={errors.width}
          type="number"
          registration={register("width", { valueAsNumber: true })}
        ></InputField>
      </div>
      <div className="mb-4">
        <InputField
          label="Wysokość"
          error={errors.height}
          type="number"
          registration={register("height", { valueAsNumber: true })}
        ></InputField>
      </div>
      <div className="mb-4">
        <InputField
          label="Felc"
          error={errors.felc}
          type="number"
          registration={register("felc", { valueAsNumber: true })}
        ></InputField>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Zapisz
      </button>
    </form>
  );
};

export default TermoblockForm;
