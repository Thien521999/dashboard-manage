// libs
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { InputHTMLAttributes, useState } from 'react';
import { Control, useController } from 'react-hook-form';

// InputHTMLAttributes: những thuộc tính bên trong input có thể tận dụng dc
export interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

const PasswordField = ({ name, control, label, ...inputProps }: PasswordFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x); //x la  gia tri trc do, !x:giá tri phu dinh
  };

  return (
    <FormControl error={invalid} fullWidth variant="outlined" margin="normal" size="small">
      <InputLabel htmlFor="pass-word">{label}</InputLabel>
      <OutlinedInput
        id="pass-word"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        inputProps={inputProps}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
