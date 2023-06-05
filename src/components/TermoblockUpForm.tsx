import {
  FieldErrors,
  FormProvider,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
} from "react-hook-form";
import { CreateTermoblockUpItemInput } from "../schema/termoblockUp.schema";
import FirstHoleFields from "./FormFields/FirstHoleFields";
import SecondHoleFields from "./FormFields/SecondHoleFields";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";

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
