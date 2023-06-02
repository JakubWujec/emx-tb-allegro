import { Controller } from "react-hook-form";

const ColorController = () => {
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <TextField
          value={value}
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched
          inputRef={ref} // wire up the input ref
        />
      )}
      name="TextField"
      control={control}
      rules={{ required: true }}
    />
  );
};
