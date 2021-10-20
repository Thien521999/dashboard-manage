// libs
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

const SelectField = ({ name, control, label, disabled, options }: SelectFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth margin="normal" size="small" disabled={disabled} error={invalid}>
      <InputLabel id={`{${name}_label}`}>{label}</InputLabel>
      <Select
        labelId={`{${name}_label}`}
        id="Filter by city"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
      >
        {/* <MenuItem value="">
          <em>All</em>
        </MenuItem> */}
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option?.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
