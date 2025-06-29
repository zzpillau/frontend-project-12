import * as Yup from 'yup'

export const channelNameSchema = (existingChannelsNames, t) => {
  return Yup.object().shape({
    name: Yup.string().trim()
      .notOneOf(existingChannelsNames, t('modals.must_be_unique'))
      .min(3, t('auth.name_length_hint'))
      .max(20, t('auth.name_length_hint'))
      .required(t('auth.required')),
  })
}

export const signUpSchema = (t) => {
  return Yup.object().shape({
    username: Yup.string().trim()
      .min(3, t('auth.name_length_hint'))
      .max(20, t('auth.name_length_hint'))
      .required(t('auth.required')),
    password: Yup.string()
      .min(6, t('auth.password_length_hint'))
      .required(t('auth.required')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], t('auth.passwords_match')),
  })
}
