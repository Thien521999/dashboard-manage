// libs
import Checkbox from '@mui/material/Checkbox';
import React, { ChangeEvent, useState } from 'react';
import { Control, useController } from 'react-hook-form';

export interface CheckboxFieldProps {
  name: string;
  control: Control<any>;
}

const CheckboxField = ({ name, control }: CheckboxFieldProps) => {
  const {
    field: { ref },
    // fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.checked);
    console.log(event.target.value);

    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      inputRef={ref}
      value={checked}
    />
  );
};

export default CheckboxField;
