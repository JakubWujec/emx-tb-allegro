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
        <label htmlFor="width" className="block text-gray-700 font-medium mb-2">
          Szerokość
        </label>
        <InputField
          type="number"
          registration={register("width", { valueAsNumber: true })}
        ></InputField>
        {errors.width && (
          <p className="text-red-500 mt-2">
            Width is required ${errors.width?.type} ${errors.width?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="height"
          className="block text-gray-700 font-medium mb-2"
        >
          Wysokość
        </label>
        <InputField
          type="number"
          registration={register("height", { valueAsNumber: true })}
        ></InputField>
        {errors.height && (
          <p className="text-red-500 mt-2">
            Height is required ${errors.height?.type} ${errors.height?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="felc" className="block text-gray-700 font-medium mb-2">
          Felc
        </label>
        <InputField
          type="number"
          registration={register("felc", { valueAsNumber: true })}
        ></InputField>
        {errors.felc && (
          <p className="text-red-500 mt-2">
            Felc is required ${errors.height?.type} ${errors.height?.message}
          </p>
        )}
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
