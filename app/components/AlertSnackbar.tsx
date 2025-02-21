// components/AlertSnackbar.tsx
import { Snackbar, Alert, AlertColor } from '@mui/material';

type AlertSnackbarProps = {
  message: string;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
};

export default function AlertSnackbar({
  message,
  severity,
  open,
  onClose,
}: AlertSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}