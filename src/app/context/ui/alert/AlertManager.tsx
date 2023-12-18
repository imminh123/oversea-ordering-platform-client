import * as React from 'react';

import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ALERT_CLOSE_TIMEOUT } from 'app/utils/constants';
import { useUI } from 'app/hooks';

function TransitionLeft(props: SlideProps) {
  return <Slide {...props} direction='left' />;
}

const AlertManager: React.FC = () => {
  const { t } = useTranslation();
  const { alert, clearAlert } = useUI();

  React.useEffect(() => {
    if (alert && alert.open) {
      setTimeout(() => {
        handleClear();
      }, ALERT_CLOSE_TIMEOUT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  const handleClear = () => clearAlert();

  if (alert.open && alert.status !== null) {
    return (
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert elevation={6} variant='filled' onClose={handleClear} severity={alert.status}>
          {t(alert.message)}
        </Alert>
      </Snackbar>
    );
  }

  return null;
};

export default AlertManager;
