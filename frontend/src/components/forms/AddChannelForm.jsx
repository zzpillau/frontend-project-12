import React from 'react'

import { useFormik } from 'formik'
import { Form } from 'react-bootstrap'

import { useGetChannelsQuery } from '../../api/channelsApi.js'

import channelNameSchema from '../../validationSchemas.js'


const AddChannelForm = ({ onSubmit }) => {
  const { data: channels } = useGetChannelsQuery()

  const existingChannelsNames = channels?.map(c => c.name) || []

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelNameSchema(existingChannelsNames),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setSubmitting(false)
      onSubmit(values)
      resetForm()
    },
    validateOnChange: false,
    validateOnBlur: false,
  })

  return (
    <Form
      id="add-channel-form"
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
        >
        </Form.Control>
        <Form.Label htmlFor="name" visuallyHidden>Имя канала</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.submitCount > 0 && formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  )
}

export default AddChannelForm
