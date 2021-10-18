// libs
import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

// InputHTMLAttributes:  những thuộc tính bên trong input có thể tận dụng dc
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

const InputField = ({ name, control, label, ...inputProps }: InputFieldProps) => {
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
      margin="normal"
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      inputProps={inputProps}
      inputRef={ref}
      error={invalid} //co invalid la co error
      helperText={error?.message}
    />
  );
};

export default InputField;

// // libs
// import { TextField } from '@mui/material';
// import React, { InputHTMLAttributes } from 'react';
// import { Control, Controller } from 'react-hook-form';

// // InputHTMLAttributes:  những thuộc tính bên trong input có thể tận dụng dc
// export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
//   control: Control<any>;
//   name: string;
//   formState: any;
//   label?: string;
//   disabled?: any;
//   defaultValue?: string;
// }

// const InputField = ({ control, name, formState, label, disabled }: InputFieldProps) => {
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
//           //   style form field
//           size="small"
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
