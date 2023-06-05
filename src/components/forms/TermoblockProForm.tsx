import { FormProvider, UseFormReturn } from "react-hook-form";
import { CreateTermoblockUpItemInput as CreateTermoblockProItemInput } from "../../schema/termoblockUp.schema";
import FirstHoleFields from "../formFields/FirstHoleFields";
import SecondHoleFields from "../formFields/SecondHoleFields";
import WidthAndHeightFields from "../formFields/WidthAndHeightFields";

interface TermoblockProFormProps {
  formMethods: UseFormReturn<CreateTermoblockProItemInput>;
  onSubmit: (values: CreateTermoblockProItemInput) => void;
}

const TermoblockProForm = ({
  formMethods,
  onSubmit,
}: TermoblockProFormProps) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <WidthAndHeightFields />
        <FirstHoleFields></FirstHoleFields>
        <SecondHoleFields></SecondHoleFields>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Zapisz
        </button>
      </form>
    </FormProvider>
  );
};

export default TermoblockProForm;
