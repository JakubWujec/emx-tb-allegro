import { FormProvider, UseFormReturn } from "react-hook-form";
import { CreateTermoblockUpItemInput as CreateTermoblockProItemInput } from "../../schema/termoblockUp.schema";
import FirstHoleFields from "../formFields/FirstHoleFields";
import SecondHoleFields from "../formFields/SecondHoleFields";
import WidthAndHeightFields from "../formFields/WidthAndHeightFields";
import SubmitButton from "../formFields/SubmitButton";

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

        <SubmitButton />
      </form>
    </FormProvider>
  );
};

export default TermoblockProForm;
