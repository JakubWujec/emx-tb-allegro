import { FormProvider, UseFormReturn } from "react-hook-form";
import { CreateTermoblockUpItemInput } from "../../schema/termoblockUp.schema";
import FirstHoleFields from "../formFields/FirstHoleFields";
import SecondHoleFields from "../formFields/SecondHoleFields";
import WidthAndHeightFields from "../formFields/WidthAndHeightFields";

interface TermoblockUpFormProps {
  formMethods: UseFormReturn<CreateTermoblockUpItemInput>;
  onSubmit: (values: CreateTermoblockUpItemInput) => void;
}

const TermoblockUpForm = ({ formMethods, onSubmit }: TermoblockUpFormProps) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <WidthAndHeightFields></WidthAndHeightFields>
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

export default TermoblockUpForm;
