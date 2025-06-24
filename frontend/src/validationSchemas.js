import * as Yup from 'yup'

export const channelNameSchema = (existingChannelsNames) => {
  return Yup.object().shape({
    name: Yup.string().trim().strict(true)
      .notOneOf(existingChannelsNames, 'DUPLICATE_ERROR')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Required'),
  })
}

export const signUpSchema = () => {
  return Yup.object().shape({
    username: Yup.string().trim().strict(true)
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Required'),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
  })
}