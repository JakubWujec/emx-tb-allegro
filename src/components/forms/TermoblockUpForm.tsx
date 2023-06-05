import { FormProvider, UseFormReturn } from "react-hook-form";
import { CreateTermoblockUpItemInput } from "../../schema/termoblockUp.schema";
import FirstHoleFields from "../formFields/FirstHoleFields";
import SecondHoleFields from "../formFields/SecondHoleFields";
import WidthAndHeightFields from "../formFields/WidthAndHeightFields";
import SubmitButton from "../formFields/SubmitButton";

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
        <SubmitButton />
      </form>
    </FormProvider>
  );
};

export default TermoblockUpForm;
