import * as yup from 'yup';

export const loginValidator = yup.object({
  userName: yup.string().required('Vui lòng nhập email').email('Email chưa đúng định dạng'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export const adminLoginValidator = yup.object({
  userName: yup.string().required('Vui lòng nhập tên tài khoản'),
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

export const updateVariableValidator = yup.object({
  value: yup.string().required('Vui lòng nhập giá trị'),
  description: yup.string().required('Vui lòng nhập mô tả'),
});
