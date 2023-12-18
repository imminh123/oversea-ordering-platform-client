import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Close, MoreVert } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { Variable } from '../api/useGetVariables';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateVariableValidator } from 'app/utils/validators';
import { HooksFormInputTextField } from 'app/components/libs/react-hooks-form';
import { UpdateVariableDto, useUpdateVariable } from '../api/useUpdateVariavle';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 400,
  p: 4,
  pt: 1,
};

interface IFormInput {
  value: string;
  description: string;
}

export const EditVariableModal = ({ item }: { item: Variable }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { mutateAsync: update, isLoading: isUpdating } = useUpdateVariable();
  const formMethods = useForm<IFormInput>({
    defaultValues: {
      value: item.value,
      description: item.description || '',
    },
    resolver: yupResolver(updateVariableValidator),
  });
  const onSubmit = async (data: IFormInput) => {
    const body: UpdateVariableDto = {
      value: data.value,
      description: data.description,
    };
    await update({ body, id: item.id });
    handleClose();
  };
  return (
    <div>
      <IconButton onClick={handleOpen} color='primary' aria-label='edit-variable'>
        <MoreVert />
      </IconButton>
      <Modal keepMounted open={open} onClose={handleClose} aria-labelledby='edit variable modal'>
        <Box sx={style}>
          <Box className='flex justify-end'>
            <IconButton onClick={handleClose} aria-label='close' title='close'>
              <Close />
            </IconButton>
          </Box>
          <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
            Chỉnh sửa '{item.name}'
          </Typography>
          <FormProvider {...formMethods}>
            <Box className='flex flex-col gap-3 mt-3'>
              <HooksFormInputTextField size={'small'} fieldName={'value'} label={'Giá trị'} />
              <HooksFormInputTextField size={'small'} fieldName={'description'} label={'Mô tả'} />
              <LoadingButton
                loadingIndicator='Đang chờ...'
                onClick={formMethods.handleSubmit(onSubmit, (err) => {
                  console.log(err);
                })}
                variant={'contained'}
                loading={isUpdating}
              >
                Lưu
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
};
