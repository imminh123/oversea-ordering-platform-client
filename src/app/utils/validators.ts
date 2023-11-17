import { LanguageTranslate } from 'app/languages';
import * as yup from 'yup';

export const loginValidator = yup.object({
  username: yup.string().required(LanguageTranslate.validate.require_exists),
  password: yup.string().required(LanguageTranslate.validate.require_exists),
});

export const signupValidator = yup.object({
  mail: yup.string().required('Vui lòng nhập email'),
  phone: yup.string().required('Vui lòng nhập số điện thoại'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
  wareHouseAddress: yup.string().required('Địa chỉ nhận hàng là bắt buộc'),
});

export const updateProfileValidator = yup.object({
  fullname: yup.string().required('Fullname is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  province: yup.string().required('Province is required'),
  city: yup.string().required('City is required'),
  ward: yup.string().required('Ward is required'),
});
