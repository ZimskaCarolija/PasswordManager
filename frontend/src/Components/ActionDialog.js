import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function ActionDialog({ open, onClose, onAction }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleActionClick = () => {
    onAction(inputValue);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Security verification</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter code from email:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="code"
          fullWidth
          variant="standard"
          value={inputValue}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleActionClick}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActionDialog;
