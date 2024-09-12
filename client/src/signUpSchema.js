import * as Yup from 'yup'

const phone = /^1?-?[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/
const email = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}(\.[a-z]{0,2})?$/i

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'At least 2 Chars!')
        .max(50, 'Too Long!')
        .required('This field is Required!'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is Required!'),
    email: Yup.string().matches(email,'Invalid email')
    .required('This field is Required!'),
    phone: Yup.string()
    .matches(phone,'not a valid phone number')
    .required('A Phone Number Is Required!'),
    userName: Yup.string()
        .min(5, 'At least 5 Chars!')
        .max(50, 'Too long!')
        .required('This field is Required!'),
    password: Yup.string()
        .min(8, 'At least 8 Chars!')
        .max(50, 'too long!')
        .required('This field is Required!'),
    confirmPassword: Yup.string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.')
});