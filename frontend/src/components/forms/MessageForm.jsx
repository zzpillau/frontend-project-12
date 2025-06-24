import React from 'react'

import { useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'

import { selectUsername } from '../../slices/authSlice'
import { selectActiveChannelId } from '../../slices/channelsSlice.js'

import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'

import { useAddMessageMutation } from '../../api/messagesApi.js'
import { useTranslation } from 'react-i18next'

import { uniqueId } from 'lodash'

// { id: '1', body: 'text message', channelId: '1', username: 'admin }

const MessageForm = () => {
  const { t } = useTranslation()

  const [addMessage] = useAddMessageMutation()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const username = useSelector(selectUsername)
  const activeChannelId = useSelector(selectActiveChannelId)

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values, { resetForm }) => {
      formik.setSubmitting(false)

      const newMessage = {
        id: uniqueId(),
        body: values.body,
        channelId: activeChannelId,
        username: username,
      }

      console.log('newMessage', newMessage)
      addMessage(newMessage)
      resetForm()
      inputRef.current?.focus()
    },
  })

  return (
    <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2 ">
      <Form.Group className="input-group has-validation">
        <Form.Control
          onChange={formik.handleChange}
          className="border-0 p-0 ps-2 form-control"
          value={formik.values.body}
          placeholder={t('input_message')}
          name="body"
          id="body"
          required
          ref={inputRef}
        />
        <Button
          type="submit"
          variant="outline"
          className="btn btn-group-vertical"
          disabled={formik.isSubmitting || !formik.values.body.length}
        >
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('send')}</span>
        </Button>
      </Form.Group>
    </Form>
  )
}

export default MessageForm
