import { useForm } from "react-hook-form";
import {
  CreateTermoblockItemInput,
  createTermoblockItemSchema,
  plColors,
  colors,
} from "../schema/termoblockItem.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";

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

  console.log("colors", colors);

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
      <div className="mb-4">
        <SelectField
          options={colors.map((color) => {
            return {
              value: color,
              label: plColors[color],
            };
          })}
          label="Kolor"
          error={errors.color}
          registration={register("color")}
        ></SelectField>
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
