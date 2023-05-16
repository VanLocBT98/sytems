import * as yup from 'yup';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .max(255, 'Nhập tối đa 255 ký tự')
    .required('Vui lòng nhập thông tin Email.'),
  password: yup.string().required('Vui lòng nhập thông tin Mật khẩu.'),
});
export const changeInfoSchema = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .max(255, 'Nhập tối đa 255 ký tự')
    .required('Vui lòng nhập thông tin Email.'),
  phone: yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  name: yup.string().required('Vui lòng nhập họ và tên'),
  password: yup.string().required('Nhập Mật khẩu là bắt buộc!'),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .max(255, 'Nhập tối đa 255 ký tự')
    .required('Vui lòng nhập thông tin Email.'),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required('Mật khẩu là bắt buộc!'),
  confirmPassword: yup.string().required('Xác nhận mật khẩu là bắt buộc!')
    .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không khớp!'),
});
export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Mật khẩu cũ là bắt buộc!'),
  password: yup.string().required('Mật khẩu mới là bắt buộc!').notOneOf([
    yup.ref('oldPassword'),
    null,
  ], 'Không được trùng với mật khẩu cũ!'),
  confirmPassword: yup.string().required('Xác nhận mật khẩu là bắt buộc!')
    .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không khớp!'),
});

export const createProjectSchema = yup.object().shape({
  projectName: yup.string().required('Vui lòng nhập tên dự án'),
  channel: yup.string().required('Vui lòng chọn kênh'),
  brand: yup.string().required('Vui lòng chọn brand'),
  kickoffDate: yup.string().required('Vui lòng chọn ngày kickoff'),
  endingDate: yup.string().required('Vui lòng chọn ngày kết thúc'),
});

export default loginSchema;
