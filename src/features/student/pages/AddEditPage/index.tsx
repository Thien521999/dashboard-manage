// libs
import { ChevronLeft } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import studentApi from 'api/studentApi';
import StudentForm from 'features/student/components/StudentForm';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// others
import './style.scss';

interface Props {}

const AddEditPage = (props: Props) => {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);

  const history = useHistory();

  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const dataStudent: Student = await studentApi.getById(studentId);
        setStudent(dataStudent);
      } catch (error) {
        throw new Error('Failed to fetch student id ');
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    // Toast success
    toast.success('Save student successfuly!');

    history.push('/admin/students');
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  };

  return (
    <Box>
      <Link to="/admin/students" className="back-student-list">
        <ChevronLeft /> Back to student list
      </Link>

      <Typography variant="h4" component="h3">
        {isEdit ? 'Update student info' : 'Add new student'}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPage;
