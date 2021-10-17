// libs
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
// others
import { City, Student } from 'models';
import * as React from 'react';
import { capitalizeString, getMarkColor } from 'untils';
import './style.scss';

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

const StudentTable = ({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {studentList?.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell sx={{ width: '145px' }}>{student.id}</TableCell>
              <TableCell>{capitalizeString(student.name)}</TableCell>
              <TableCell>{capitalizeString(student.gender)}</TableCell>
              <TableCell>
                <Box color={getMarkColor(student.mark)} sx={{ fontWeight: 'bold' }}>
                  {student.mark}
                </Box>
              </TableCell>
              <TableCell>{cityMap[student.city]?.name}</TableCell>
              <TableCell align="right">
                <Button
                  color="primary"
                  onClick={() => onEdit?.(student)}
                  sx={{ marginRight: '8px', fontWeight: 'bold' }}
                  size="small"
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => onRemove?.(student)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
