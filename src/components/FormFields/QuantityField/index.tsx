// libs
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { FormHelperText, OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/system';
import React from 'react';
import { Control, useController } from 'react-hook-form';
// others
import './style.scss';

export interface QuantityFieldProps {
  name: string;
  control: Control<any>;
  disabled?: boolean;
  setValue?: any;
}

const QuantityField = ({ name, control, disabled, setValue }: QuantityFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const handleChange = (value: number) => {
    if (value >= 0) {
      setValue(name, value);
      if (onChange) onChange(value);
    }
  };

  return (
    <FormControl fullWidth margin="normal" component="fieldset" error={invalid}>
      <Box className="box">
        <span
          className="icon-remove"
          onClick={() => {
            handleChange(value - 1);
          }}
        >
          <HorizontalRuleIcon />
        </span>
        <OutlinedInput
          id={name}
          type="number"
          disabled={disabled}
          value={value}
          onBlur={onBlur}
          inputRef={ref}
          onChange={(e: any) => {
            handleChange(Number.parseInt(e.target.value));
          }}
        />
        <span
          className="icon-add"
          onClick={() => {
            handleChange(value + 1);
          }}
        >
          <AddIcon />
        </span>
      </Box>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default QuantityField;
