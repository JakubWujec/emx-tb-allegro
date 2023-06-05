import { FormProvider, UseFormReturn } from "react-hook-form";
import FirstHoleFields from "../formFields/FirstHoleFields";
import SecondHoleFields from "../formFields/SecondHoleFields";
import WidthAndHeightFields from "../formFields/WidthAndHeightFields";
import SubmitButton from "../formFields/SubmitButton";
import FelcField from "../formFields/FelcField";
import ThirdHoleFields from "../formFields/ThirdHoleFields";
import { CreateTermoblockProItemInput } from "../../schema/termoblockPro.schema";
import ColorsFields from "../formFields/ColorFields";

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
        <ColorsFields></ColorsFields>
        <WidthAndHeightFields />
        <FelcField></FelcField>
        <FirstHoleFields></FirstHoleFields>
        <SecondHoleFields></SecondHoleFields>
        <ThirdHoleFields></ThirdHoleFields>
        <SubmitButton />
      </form>
    </FormProvider>
  );
};

export default TermoblockProForm;
