import { FormProvider, UseFormReturn } from "react-hook-form";
import { CreateTermoblockGoItemInput } from "../../schema/termoblockGo.schema";
import ColorFields from "../formFields/ColorFields";
import FirstHoleFields from "../formFields/FirstHoleFields";
import PowerCordHoleFields from "../formFields/PowerCordHoleFields";
import SecondHoleFields from "../formFields/SecondHoleFields";
import WidthAndHeightFields from "../formFields/WidthAndHeightFields";
import HingeField from "../formFields/HingeField";

interface TermoblockGoFormProps {
  formMethods: UseFormReturn<CreateTermoblockGoItemInput>;
  onSubmit: (values: CreateTermoblockGoItemInput) => void;
}

const TermoblockGoForm = ({ formMethods, onSubmit }: TermoblockGoFormProps) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <WidthAndHeightFields></WidthAndHeightFields>
        <ColorFields></ColorFields>
        <HingeField></HingeField>
        <FirstHoleFields />
        <SecondHoleFields></SecondHoleFields>
        <PowerCordHoleFields />

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

export default TermoblockGoForm;
