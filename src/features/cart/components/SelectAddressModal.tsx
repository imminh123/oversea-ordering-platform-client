import { Close } from '@mui/icons-material';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Button,
  styled,
  Paper,
  Modal,
  Checkbox,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { HooksFormInputTextField, HooksFormInputAddress } from 'app/components/libs/react-hooks-form';
import { FormProvider, useForm } from 'react-hook-form';
import { AddressRes } from '../api/useGetAddressListing';
import { yupResolver } from '@hookform/resolvers/yup';
import { chooseAddessValidator } from 'app/utils/validators';
import { useRef, useState } from 'react';
import { useAddAddress, IAddAddressParams } from '../api/useAddAddress';
import { useDeleteAddress } from '../api/useDeleteAddress';
import useConfirmAlert from 'app/hooks/useConfirmAlert';
import { AddressData } from 'app/components/form/AddressInput';
import { useUpdateAddress } from '../api/useUpdateAddress';
import { LoadingButton } from '@mui/lab';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  padding: '10px',
  color: theme.palette.text.secondary,
  marginBottom: '10px',
  '&:hover': {
    background: '#f2f2f2',
  },
}));

interface IFormInput {
  name: string;
  phone: string;
  mail: string;
  note?: string;
  address: string;
  addressObjectData?: AddressData;
  isDefault?: boolean;
}

const Label = ({ add }: { add: AddressRes }) => {
  return (
    <Box>
      <p className=' font-bold text-xs sm:text-sm'>{`${add.name || 'Chưa có thông tin'} - ${
        add.phone || 'Chưa có thông tin'
      }`}</p>
      <p className='text-xs sm:text-sm'>{`${add.address}, ${add.ward}, ${add.city}, ${add.province}`}</p>
    </Box>
  );
};

export const SelectAddressModal = ({ addressList, setId }: { addressList: AddressRes[]; setId: any }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth: '375px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
    pt: 0,
    ...(matchesSM && {
      overflow: 'scroll',
      height: '100%',
      display: 'block',
    }),
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addressId, setAddressId] = useState(
    addressList.find((e) => {
      if (e.isDefault) {
        return e.id;
      }
    })?.id,
  );
  const [editId, setEditId] = useState('');
  const { mutateAsync: deleteAddress } = useDeleteAddress();
  const { mutateAsync: addAddress } = useAddAddress();
  const { mutateAsync: updateAddress, isLoading: updating } = useUpdateAddress();
  const { confirm } = useConfirmAlert();
  const [isSetDefault, setIsDefault] = useState(false);
  const [addAdressOpen, setAddAdressOpen] = useState(false);

  const handleClickOpenAddress = () => {
    setAddAdressOpen(true);
  };

  const handleCloseAddAddress = () => {
    setAddAdressOpen(false);
  };
  const handleEditAddress = (id: string) => {
    setAddressId(id);
    const editAddress = addressList.find((e) => e.id === id);

    if (!editId && editId !== id && !!editAddress) {
      setEditId(id);
      setIsDefault(editAddress.isDefault);
      formEditMethods.reset({
        ...editAddress,
        addressObjectData: {
          province: editAddress.province,
          district: editAddress.city,
          ward: editAddress.ward,
        },
      });
    } else {
      setEditId('');
    }
  };

  const handleDeleteAddress = (id: string) => {
    confirm({
      onConfirm: () => {
        deleteAddress(id);
      },
      options: {
        title: 'Bạn có chắc muốn xóa địa chỉ này?',
        confirmationText: 'Xóa',
        cancellationText: 'Hủy',
        description: 'Khi xác nhận sẽ không thể hoàn tác',
      },
    });
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressId((event.target as HTMLInputElement).value);
  };

  const chooseAdress = useRef<any>();

  const onCreateNewAddress = (data: any) => {
    const body: IAddAddressParams = {
      ...data,
      isDefault: isSetDefault,
      province: data?.addressObjectData?.province,
      city: data?.addressObjectData?.district,
      ward: data?.addressObjectData?.ward,
    };
    addAddress(body);
    handleCloseAddAddress();
  };

  const formMethods = useForm<IFormInput>({
    defaultValues: {
      name: '',
      phone: '',
      mail: '',
      note: '',
      address: '',
      isDefault: false,
      addressObjectData: {
        province: '',
        district: '',
        ward: '',
      },
    },
    resolver: yupResolver(chooseAddessValidator),
  });

  const formEditMethods = useForm<IFormInput>({
    resolver: yupResolver(chooseAddessValidator),
  });

  const onUpdateAddress = (data: any) => {
    const body: IAddAddressParams = {
      ...data,
      isDefault: isSetDefault,
      province: data?.addressObjectData?.province,
      city: data?.addressObjectData?.district,
      ward: data?.addressObjectData?.ward,
    };
    updateAddress({ id: editId, body });
  };
  const onSave = () => {
    setId(addressId);
    setOpen(false);
  };
  return (
    <div>
      <Button size='small' variant='text' onClick={handleOpen}>
        Thay đổi
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='select ship address' aria-describedby='choose address'>
        <Box sx={style}>
          <Box className='flex justify-end'>
            <IconButton className='!mr-[-30px]' onClick={handleClose} aria-label='close' title='close'>
              <Close />
            </IconButton>
          </Box>
          <RadioGroup
            aria-labelledby='pick-order-address'
            value={addressId}
            onChange={handleRadioChange}
            name='pick-address'
            className='mb-4'
          >
            {addressList.map((add: AddressRes) => {
              return (
                <Item key={add.id} sx={{ flexDirection: 'column' }}>
                  <Box className='flex justify-between'>
                    <FormControlLabel value={add.id} control={<Radio />} label={<Label add={add} />} />
                    <Box>
                      <Button
                        title='Sửa địa chỉ'
                        size='small'
                        color='primary'
                        aria-label='delete'
                        sx={{ fontSize: '12px' }}
                        onClick={() => handleEditAddress(add.id)}
                      >
                        Sửa địa chỉ
                      </Button>
                      <Button
                        title='Xóa địa chỉ'
                        size='small'
                        color='error'
                        aria-label='delete'
                        sx={{ fontSize: '12px' }}
                        onClick={() => handleDeleteAddress(add.id)}
                      >
                        Xóa địa chỉ
                      </Button>
                    </Box>
                  </Box>
                  <Box>
                    {editId === add.id && addressId && (
                      <Box className='mt-3'>
                        <FormProvider {...formEditMethods}>
                          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                            <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                              <Box flex={1}>
                                <HooksFormInputTextField
                                  fullWidth
                                  size={'small'}
                                  fieldName={'name'}
                                  label={'Họ và tên'}
                                />
                              </Box>
                              <Box flex={1}>
                                <HooksFormInputTextField fullWidth size={'small'} fieldName={'phone'} label={'Sđt'} />
                              </Box>
                            </Box>
                            <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                              <Box flex={1}>
                                <HooksFormInputTextField
                                  fullWidth
                                  size={'small'}
                                  fieldName={'address'}
                                  label={'Địa chỉ'}
                                />
                              </Box>
                              <Box flex={1}>
                                <HooksFormInputTextField fullWidth size={'small'} fieldName={'mail'} label={'Email'} />
                              </Box>
                            </Box>
                            <HooksFormInputAddress
                              fieldName={'addressObjectData'}
                              size={'small'}
                              sx={{ gridColumn: 'span 2' }}
                              spacing={'10px'}
                            />
                            <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                              <Box flex={1}>
                                <HooksFormInputTextField size={'small'} fieldName={'note'} label={'Ghi chú'} />
                              </Box>
                              <Box flex={1}>
                                <Checkbox
                                  checked={isSetDefault}
                                  onChange={(e) => {
                                    setIsDefault(e.target.checked);
                                  }}
                                  color='primary'
                                />
                                Mặc định
                              </Box>
                            </Box>
                            <Box className='flex justify-end'>
                              <LoadingButton
                                loadingIndicator='Đang chờ...'
                                loading={updating}
                                title='Cập nhật'
                                color='primary'
                                aria-label='delete'
                                onClick={formEditMethods.handleSubmit(onUpdateAddress, (err) => {
                                  console.log(err);
                                })}
                              >
                                Cập nhật
                              </LoadingButton>
                              <Button
                                title='Hủy thay đổi'
                                color='error'
                                aria-label='delete'
                                onClick={() => setEditId('')}
                              >
                                Hủy thay đổi
                              </Button>
                            </Box>
                          </Box>
                        </FormProvider>
                      </Box>
                    )}
                  </Box>
                </Item>
              );
            })}
          </RadioGroup>

          <Dialog open={addAdressOpen} onClose={handleCloseAddAddress}>
            <DialogTitle>Thêm địa chỉ giao hàng</DialogTitle>
            <DialogContent>
              <FormProvider {...formMethods}>
                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                  <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                    <Box flex={1}>
                      <HooksFormInputTextField fullWidth size={'small'} fieldName={'name'} label={'Họ và tên'} />
                    </Box>
                    <Box flex={1}>
                      <HooksFormInputTextField fullWidth size={'small'} fieldName={'phone'} label={'Sđt'} />
                    </Box>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                    <Box flex={1}>
                      <HooksFormInputTextField fullWidth size={'small'} fieldName={'address'} label={'Địa chỉ'} />
                    </Box>
                    <Box flex={1}>
                      <HooksFormInputTextField fullWidth size={'small'} fieldName={'mail'} label={'Email'} />
                    </Box>
                  </Box>
                  <HooksFormInputAddress
                    fieldName={'addressObjectData'}
                    size={'small'}
                    sx={{ gridColumn: 'span 2' }}
                    spacing={'10px'}
                  />
                  <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                    <Box flex={1}>
                      <HooksFormInputTextField size={'small'} fieldName={'note'} label={'Ghi chú'} />
                    </Box>
                    <Box flex={1}>
                      <Checkbox
                        checked={isSetDefault}
                        onChange={(e) => {
                          setIsDefault(e.target.checked);
                        }}
                        color='primary'
                      />
                      Mặc định
                    </Box>
                  </Box>
                </Box>
              </FormProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddAddress}>Hủy</Button>
              <Button
                size='small'
                onClick={formMethods.handleSubmit(onCreateNewAddress, (err) => {
                  console.log(err);
                })}
                variant={'contained'}
              >
                Thêm địa chỉ
              </Button>
            </DialogActions>
          </Dialog>
          <Box className='flex justify-end'>
            <Button variant='text' sx={{ marginRight: 1 }} onClick={handleClickOpenAddress}>
              Thêm địa chỉ
            </Button>
            <Button
              variant='contained'
              size='small'
              title='Sửa địa chỉ'
              color='warning'
              aria-label='delete'
              onClick={() => onSave()}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
