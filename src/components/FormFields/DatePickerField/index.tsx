// libs

import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface DatePickerFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

const DatePickerField = ({ name, control, label, ...inputProps }: DatePickerFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      size="small"
      id="date"
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputProps={inputProps}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DatePickerField;
