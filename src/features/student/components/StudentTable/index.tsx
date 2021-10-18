// libs
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
// others
import { City, Student } from 'models';
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
  const [open, setOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleRemoveClick = (student: Student) => {
    // set selected student
    setSelectedStudent(student);

    // show diaglog
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveConfirm = (selectedStudent: Student) => {
    if (!onRemove) return;
    onRemove?.(selectedStudent);

    // hide dialog
    setOpen(false);
  };

  const handleEditStudent = (selectedStudent: Student) => {
    if (!onEdit) return;
    onEdit?.(selectedStudent);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mark</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Action
              </TableCell>
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
                    sx={{ marginRight: '8px', fontWeight: 'bold' }}
                    size="small"
                    onClick={() => handleEditStudent(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    sx={{ fontWeight: 'bold' }}
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Remove a student'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove named "{selectedStudent?.name}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            autoFocus
            variant="contained"
            color="warning"
            size="small"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentTable;
