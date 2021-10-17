// libs
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// others
import { Student } from 'models';
import * as React from 'react';

export interface StudentRankingListProps {
  studentList: Student[];
}

const StudentRankingList = ({ studentList }: StudentRankingListProps) => {
  return (
    <TableContainer>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {studentList.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="right">{student.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentRankingList;
