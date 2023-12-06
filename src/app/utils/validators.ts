import * as yup from 'yup';

export const loginValidator = yup.object({
  username: yup.string().required('Vui lòng nhập email').email('Email chưa đúng định dạng'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export const signupValidator = yup.object({
  mail: yup.string().required('Vui lòng nhập email').email('Email chưa đúng định dạng'),
  phone: yup.string().required('Vui lòng nhập số điện thoại'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
  wareHouseAddress: yup.string().required('Địa chỉ nhận hàng là bắt buộc'),
});

export const updateProfileValidator = yup.object({
  fullname: yup.string().required('Vui lòng nhập họ tên'),
  phone: yup.string().required('Vui lòng nhập số điện thoại'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
});

export const chooseAddessValidator = yup.object({
  name: yup.string().required('Vui lòng nhập họ tên'),
  phone: yup.string().required('Vui lòng nhập sđt'),
  mail: yup.string().required('Vui lòng nhập email').email('Email chưa đúng định dạng'),
  address: yup.string().required('Vui lòng nhập địa chỉ chính xác'),
  // province: yup.string().required('Province is required'),
  // city: yup.string().required('City is required'),
  // ward: yup.string().required('Ward is required'),
});
