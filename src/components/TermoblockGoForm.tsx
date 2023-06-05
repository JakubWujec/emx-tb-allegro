import { FormProvider, UseFormReturn } from "react-hook-form";
import { CreateTermoblockGoItemInput } from "../schema/termoblockGo.schema";
import ColorFields from "./FormFields/ColorFields";
import FirstHoleFields from "./FormFields/FirstHoleFields";
import HingesFields from "./FormFields/HingeFields";
import SecondHoleFields from "./FormFields/SecondHoleFields";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";
import PowerCordHoleFields from "./FormFields/PowerCordHoleFields";

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
        <HingesFields></HingesFields>
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
