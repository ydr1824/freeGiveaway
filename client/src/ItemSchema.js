import * as Yup from 'yup'

const url = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+\.[a-z0-9]$/i

export const itemSchema = Yup.object().shape({
    itemName: Yup.string()
        .min(5, 'At least 10 Chars!')
        .max(50, 'Too Long!')
        .required('This field is Required!'),
    itemLink: Yup.string().matches(url, 'Invalid url!'),
    condition: Yup.string()
        .required('You have to select one of the options!'),
    description: Yup.string()
        .min(15, 'Please describe it in more words!')
        .max(100, ' You reached the maximum of the description!')


})
