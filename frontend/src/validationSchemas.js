import * as Yup from 'yup'

const channelNameSchema = (existingChannelsNames) => {
  return Yup.object().shape({
    name: Yup.string().trim().strict(true)
      .notOneOf(existingChannelsNames, 'DUPLICATE_ERROR')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Required'),
  })
}


export default channelNameSchema