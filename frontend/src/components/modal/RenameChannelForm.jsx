import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useGetChannelsQuery } from '../../api/channelsApi.js'

import { selectChannelName } from '../../slices/modalSlice.js'

import { useTranslation } from 'react-i18next'

import toastify from '../../toast/toastify.js'

import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'

import { channelNameSchema } from '../../validation/validationSchemas.js'

const RenameChannelForm = ({ onSubmit }) => {
  const { t } = useTranslation()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { data: channels } = useGetChannelsQuery()

  const existingChannelsNames = channels?.map(c => c.name) || []

  const oldName = useSelector(selectChannelName)

  const formik = useFormik({
    initialValues: {
      name: oldName,
    },
    validationSchema: channelNameSchema(existingChannelsNames, t),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await onSubmit({name: values.name.trim()})
        resetForm()
      }
      catch (err) {
        console.error('Channel rename error occured', err)
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
      id="rename"
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
        <Form.Label htmlFor="name" visuallyHidden>{t('channel_name')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.submitCount > 0 && formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  )
}

export default RenameChannelForm
