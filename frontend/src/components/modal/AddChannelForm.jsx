import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'

import { useGetChannelsQuery } from '../../api/channelsApi.js'

import { channelNameSchema } from '../../validation/validationSchemas.js'
import toastify from '../../toast/toastify.js'

const AddChannelForm = ({ onSubmit }) => {
  const { t } = useTranslation()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { data: channels } = useGetChannelsQuery()

  const existingChannelsNames = channels?.map(c => c.name) || []

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameSchema(existingChannelsNames, t),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await onSubmit({ ...values, name: values.name.trim() })
        resetForm()
      }
      catch (err) {
        console.error('Channel add error occured', err)
        toastify(t, 'error', err.status)
      }
      finally {
        setSubmitting(false)
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  })

  return (
    <Form
      id="add"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <Form.Group>
        <Form.Control
          id="name"
          name="name"
          className="mb-2 d-block"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          isInvalid={formik.touched.name && formik.errors.name}
          disabled={formik.isSubmitting}
          ref={inputRef}
        >
        </Form.Control>
        <Form.Label htmlFor="name" visuallyHidden>{t('modals.channel_name')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.submitCount > 0 && formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  )
}

export default AddChannelForm
