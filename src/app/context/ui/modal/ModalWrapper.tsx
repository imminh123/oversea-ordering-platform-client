import * as React from 'react';

import { CloseOutlined as CloseOutlinedIcon } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton as MUIIconButton,
  Slide,
  SlideProps,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useUI } from 'app/hooks';

import { EModalType } from '../enum';

interface Props {
  modalType: EModalType;
  title: string;
  actions?: React.ReactElement;
  closeable: boolean;
  loading?: boolean;
}

const IconButton = styled(MUIIconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ModalWrapper: React.FC<Props> = ({
  children,
  title,
  closeable,
  actions,
  modalType,
  loading = false,
  ...rest
}) => {
  const theme = useTheme();
  const { checkOpen, closeModal } = useUI();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const status = checkOpen('modal', modalType);

  return (
    <Dialog
      open={status}
      maxWidth='sm'
      fullScreen={matchesXS}
      fullWidth
      TransitionComponent={Transition}
      onClose={closeModal}
      {...rest}
    >
      <DialogTitle>
        {title}
        {closeable && (
          <IconButton onClick={() => closeModal()}>
            <CloseOutlinedIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default ModalWrapper;
