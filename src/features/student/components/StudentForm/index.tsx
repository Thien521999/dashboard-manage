// libs
import { Box } from '@mui/system';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from 'components/FormFields/InputField';
import { Button } from '@mui/material';
import RadioGroupField from 'components/FormFields/RadioGroupField';
import SelectField from 'components/FormFields/SelectField';
import { useAppSelector } from 'app/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const StudentForm = ({ initialValues, onSubmit }: StudentFormProps) => {
  const [error, setError] = useState<string>('');

  const schema = yup.object().shape({
    name: yup
      .string()
      .test(
        'At least 2 words',
        'Please enter at least 2 words',
        (value: any) => value.split(' ').filter((x: any) => x !== '').length >= 2
      )
      .required('Please enter your full name'),
    age: yup
      .number()
      .positive('Please enter a positive number')
      .min(5, 'Min age is 5')
      .max(80, 'Max age is 80')
      .integer('Please enter an integer')
      .required('Please enter age')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark')
      .typeError('Please enter a valid number'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please enter either male or female')
      .required('Please select gender'),
    city: yup.string().required('Please select city'),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      // clear error previous submit
      setError('');

      if (!onSubmit) return;
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error);
    }
  };

  const { data: cityList } = useAppSelector((state: any) => state.city?.cityList);
  const cityOptions = cityList?.map((city: City) => ({
    label: city.name,
    value: city.code,
  }));

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        <InputField name="age" control={control} label=" Age" type="number" />
        <InputField name="mark" control={control} label=" Mark" type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} />} &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StudentForm;
