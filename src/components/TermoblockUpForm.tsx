import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { CreateTermoblockUpItemInput } from "../schema/termoblockUp.schema";
import FirstHoleFields from "./FormFields/FirstHoleFields";
import SecondHoleFields from "./FormFields/SecondHoleFields";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";

interface TermoblockUpFormProps {
  register: UseFormRegister<CreateTermoblockUpItemInput>;
  handleSubmit: UseFormHandleSubmit<CreateTermoblockUpItemInput>;
  errors: FieldErrors<CreateTermoblockUpItemInput>;
  onSubmit: SubmitHandler<CreateTermoblockUpItemInput>;
  watch: UseFormWatch<CreateTermoblockUpItemInput>;
}

const TermoblockUpForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  watch,
}: TermoblockUpFormProps) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
};

export default TermoblockUpForm;
