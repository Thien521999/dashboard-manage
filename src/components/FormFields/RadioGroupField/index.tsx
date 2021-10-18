// // libs
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import React from 'react';
// import { Control, useController } from 'react-hook-form';
// import FormHelperText from '@mui/material/FormHelperText';

// export interface RadioOption {
//   label?: string;
//   value: number | string;
// }

// export interface RadioGroupFieldProps {
//   name: string;
//   control: Control<any>;
//   label?: string;
//   disabled?: boolean;
//   options: RadioOption[];
// }

// const RadioGroupField = ({ name, control, label, disabled, options }: RadioGroupFieldProps) => {
//   const {
//     field: { value, onChange, onBlur },
//     fieldState: { invalid, error },
//   } = useController({
//     name,
//     control,
//   });

//   return (
//     <FormControl margin="normal" disabled={disabled} component="fieldset" error={invalid}>
//       <FormLabel component="legend">{label}</FormLabel>
//       <RadioGroup name={name} onChange={onChange} onBlur={onBlur} value={value}>
//         {options.map((option) => (
//           <FormControlLabel
//             key={option.value}
//             value={option.value}
//             control={<Radio />}
//             label={option.label}
//           />
//         ))}
//       </RadioGroup>
//       <FormHelperText>{error?.message}</FormHelperText>
//     </FormControl>
//   );
// };

// export default RadioGroupField;

// libs
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  control: Control<any>;
  name: string;
  formState?: any;
  label?: string;
  disabled?: any;
  options: RadioOption[];
}

const RadioGroupField = ({
  control,
  name,
  formState, //get error
  label,
  disabled,
  options,
}: RadioGroupFieldProps) => {
  const { errors } = formState;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl margin="normal" disabled={disabled} component="fieldset" error={!!hasError}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup {...field} name={name}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RadioGroupField;
