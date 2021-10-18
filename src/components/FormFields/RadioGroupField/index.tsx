// libs
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

const RadioGroupField = ({ name, control, label, disabled, options }: RadioGroupFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl margin="normal" disabled={disabled} component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} onChange={onChange} onBlur={onBlur} value={value}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroupField;

// // libs
// import { TextField } from '@mui/material';
// import React, { InputHTMLAttributes } from 'react';
// import { Control, Controller } from 'react-hook-form';

// // InputHTMLAttributes:  những thuộc tính bên trong input có thể tận dụng dc
// export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
//   control: Control<any>;
//   name: string;
//   formState?: any;
//   label?: string;
//   disabled?: any;
//   defaultValue?: string;
// }

// const InputField = ({
//   control,
//   name,
//   formState, //get error
//   label,
//   disabled,
//   defaultValue,
// }: InputFieldProps) => {
//   const { errors } = formState;
//   console.log(errors);

//   const hasError = errors[name];
//   console.log(hasError);

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <TextField
//           {...field}
//           label={label}
//           disabled={disabled}
//           defaultValue={defaultValue}
//           //   style form field
//           fullWidth
//           variant="outlined"
//           margin="normal"
//           //   show error
//           error={!!hasError}
//           helperText={errors[name]?.message}
//         />
//       )}
//     />
//   );
// };

// export default InputField;
