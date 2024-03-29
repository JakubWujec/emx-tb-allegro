import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import type { FieldWrapperPassThroughProps } from "./FieldWrapper";
import { FieldWrapper } from "./FieldWrapper";

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password" | "number";
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = "text", label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        min="0"
        className={clsx(
          "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-mainOrange focus:ring-mainOrange sm:text-sm",
          className
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
