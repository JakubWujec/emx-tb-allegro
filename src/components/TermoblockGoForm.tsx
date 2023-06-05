import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { CreateTermoblockGoItemInput } from "../schema/termoblockGo.schema";
import FirstHoleFields from "./FormFields/FirstHoleFields";
import PowerCordHoleFields from "./FormFields/PowerCordHoleFields";
import SecondHoleFields from "./FormFields/SecondHoleFields";
import WidthAndHeightFields from "./FormFields/WidthAndHeightFields";
import { SelectField } from "./SelectField";
import ColorFields from "./FormFields/ColorFields";
import HingesFields from "./FormFields/HingesFields";

interface TermoblockGoFormProps {
  register: UseFormRegister<CreateTermoblockGoItemInput>;
  handleSubmit: UseFormHandleSubmit<CreateTermoblockGoItemInput>;
  errors: FieldErrors<CreateTermoblockGoItemInput>;
  onSubmit: SubmitHandler<CreateTermoblockGoItemInput>;
  watch: UseFormWatch<CreateTermoblockGoItemInput>;
}

const TermoblockGoForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  watch,
}: TermoblockGoFormProps) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </>
  );
};

export default TermoblockGoForm;
