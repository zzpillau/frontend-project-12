import * as Yup from 'yup'

export const channelNameSchema = (existingChannelsNames, t) => {
  return Yup.object().shape({
    name: Yup.string().trim().strict(true)
      .notOneOf(existingChannelsNames, t('must_be_unique'))
      .min(3, t('name_length_hint'))
      .max(20, t('name_length_hint'))
      .required(t('required')),
  })
}

export const signUpSchema = (t) => {
  return Yup.object().shape({
    username: Yup.string().trim().strict(true)
      .min(3, t('name_length_hint'))
      .max(20, t('name_length_hint'))
      .required(t('required')),
    password: Yup.string()
      .min(6, t('password_length_hint'))
      .required(t('required')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], t('passwords_match')),
  })
}
