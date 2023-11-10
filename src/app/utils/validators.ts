import { LanguageTranslate } from 'app/languages';
import * as yup from 'yup';

export const loginValidator = yup.object({
  username: yup.string().required(LanguageTranslate.validate.require_exists),
  password: yup.string().required(LanguageTranslate.validate.require_exists),
});

export const updateProfileValidator = yup.object({
  fullname: yup.string().required('Fullname is required'),
  phone: yup.string().required('Phone is required'),
});
