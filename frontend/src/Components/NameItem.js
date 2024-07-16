import * as React from 'react';
import '../App.css';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../App.css';
import { DeleteData,ViewData } from '../Functions/FunctionsItem';
export default function NameItem({ name, id, token, functioN }) {
  const handleFun = (id, type) => {
    functioN(id, type);
  };

  return (
    <Paper elevation={3} className='Item'>
      <div>{name}</div>
      <div className='ButtonGroup'>
        <Button variant="outlined" startIcon={<VisibilityIcon />} onClick={() => handleFun(id, 'view')}>
          View
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleFun(id, 'delete')}>
          Delete
        </Button>
      </div>
    </Paper>
  );
}
