import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

const ConfirmDialog = (props) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle  id="confirm-dialog">{title}</DialogTitle>
      <DialogContent >{children}</DialogContent>
      <DialogActions >
       
          <Box display={"flex" } gap={1} width={"100%"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="error"
        >
          Delete
        </Button>
        <Button
          variant="text"
          onClick={() => setOpen(false)}
          color="inherit"
        >
          Cansel
        </Button>
          </Box>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;